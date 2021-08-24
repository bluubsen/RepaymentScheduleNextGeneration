const calculateRepaymentSchedule = (repaymentInformation) => {
    const durationInMonths = repaymentInformation.duration * 12;
    const loanInCent = repaymentInformation.loan * 100; //calculate with cent's to prevent floating point errors
    const interestAsNumber = Number(repaymentInformation.interest);
    const monthlyRateInCent = Math.floor((interestAsNumber + Number(repaymentInformation.repayment)) / 100 * loanInCent / 12); // always shorten and receive the remaining amount at the end
    const monthlyEntries = [];

    calcPayoutOfLoan(loanInCent, monthlyEntries);
    calcFirstRepayment(loanInCent, interestAsNumber, monthlyRateInCent, monthlyEntries); //(converts negativ values)

    for (let i = 0; i < durationInMonths; i++) {
        const entryBefore = monthlyEntries[monthlyEntries.length - 1];
        let monthlyEntry;
        if (entryBefore.remainingLoanInCent < monthlyRateInCent) {
            calcLastRepayment(entryBefore, interestAsNumber, monthlyEntries);
            break;
        }

        const interestInCent = calculateInterest(entryBefore.remainingLoanInCent, interestAsNumber);
        const repaymentInCent = monthlyRateInCent - interestInCent;
        const remainingLoanInCent = entryBefore.remainingLoanInCent - repaymentInCent;
        monthlyEntry = createMonthlyEntry(getNextDate(entryBefore.lastDayOfMonth), interestInCent, repaymentInCent, monthlyRateInCent, remainingLoanInCent);

        monthlyEntries.push(monthlyEntry);
    }

    //calculate last repayment
    let sumInterest = 0;
    let sumRepayment = 0;
    let sumMonthlyRate = 0;
    for (let i = 1; i < monthlyEntries.length; i++) {
        const e = monthlyEntries[i];
        sumInterest += e.interestInCent;
        sumRepayment += e.repaymentInCent;
        sumMonthlyRate += e.monthlyRateInCent;
    }
    monthlyEntries.push(createMonthlyEntry("Zinsbindungsende", sumInterest, sumRepayment, sumMonthlyRate, monthlyEntries[monthlyEntries.length - 1].remainingLoanInCent));

    return monthlyEntries.map(e => {
        const d = e.lastDayOfMonth;
        return {
            date: d instanceof Date ? d.toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric', year: 'numeric' }) : d,
            interest: convertCentsToReadableText(e.interestInCent),
            repayment: convertCentsToReadableText(e.repaymentInCent),
            rate: convertCentsToReadableText(e.monthlyRateInCent),
            loan: convertCentsToReadableText(e.remainingLoanInCent),
        };
    })
}

const calcPayoutOfLoan = (loanInCent, entries) => {
    entries.push(createMonthlyEntry(getLastDateOfMonth(new Date()), 0, -loanInCent, -loanInCent, -loanInCent));
}

const calcFirstRepayment = (loanInCent, interestAsNumber, monthlyRateInCent, entries) => {
    const interestInCent = calculateInterest(loanInCent, interestAsNumber);
    const repaymentInCent = monthlyRateInCent - interestInCent;
    const remainingLoanInCent = loanInCent - repaymentInCent;
    entries.push(createMonthlyEntry(getNextDate(entries[0].lastDayOfMonth), interestInCent, repaymentInCent, monthlyRateInCent, remainingLoanInCent));
}

const createMonthlyEntry = (date, interestInCent, repaymentInCent, monthlyRateInCent, remainingLoanInCent) => {
    const entry = {};
    entry.lastDayOfMonth = date;
    entry.interestInCent = interestInCent;
    entry.repaymentInCent = repaymentInCent;
    entry.monthlyRateInCent = monthlyRateInCent;
    entry.remainingLoanInCent = remainingLoanInCent;
    return entry;
}


const calculateInterest = (remainingLoan, interest) => {
    const monthlyInterest = interest / 100 / 12;
    return Math.round(remainingLoan * monthlyInterest);
}

const getNextDate = date => {
    let nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    nextDate = getLastDateOfMonth(nextDate);
    return nextDate;
}

const getLastDateOfMonth = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

const convertCentsToReadableText = (v) => {
    v = v / 100;
    return v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

const calcLastRepayment = (entryBefore, interestAsNumber, monthlyEntries) => {
    const interestInCent = calculateInterest(entryBefore.remainingLoanInCent, interestAsNumber);
    const rate = entryBefore.remainingLoanInCent + interestInCent;
    monthlyEntries.push(createMonthlyEntry(getNextDate(entryBefore.lastDayOfMonth), interestInCent, entryBefore.remainingLoanInCent, rate, 0));
}
export { calculateRepaymentSchedule }

