const validateForm = (values, validationConfig) => {
    let errors = {};

    if (!values.loan) {
        errors.loan = 'Geben Sie ein Darlensbetrag an.';
    } else if (values.loan < validationConfig.minLoan) {
        errors.loan = `Geben Sie ein Darlensbetrag größer ${validationConfig.minLoan}€ ein.`;
    } else if (values.loan > validationConfig.maxLoan) {
        errors.loan = `Geben Sie ein Darlensbetrag kleiner als ${validationConfig.maxLoan}€ ein.`;
    }

    if (!values.interest) {
        errors.interest = 'Geben Sie einen Zollzins an.';
    } else if (values.interest < validationConfig.minInterest || values.interest > validationConfig.maxInterest) {
        errors.interest = `Geben Sie einen Zollzins zwischen ${validationConfig.minInterest}% und ${validationConfig.maxInterest}% ein.`;
    } else if (values.interest.toString().length > validationConfig.maxLengthPercentage) {
        errors.interest = `Die maximale Zeichenlänge beträgt ${validationConfig.maxLengthPercentage}`;
    }

    if (!values.repayment) {
        errors.repayment = 'Geben Sie eine anfangs Tilgung an.';
    } else if (values.repayment < validationConfig.minRepayment || values.repayment > validationConfig.maxRepayment) {
        errors.repayment = `Geben Sie eine anfangs Tilgung zwischen ${validationConfig.minRepayment}% und ${validationConfig.maxRepayment}% ein.`;
    } else if (values.repayment.toString().length > validationConfig.maxLengthPercentage) {
        errors.repayment = `Die maximale Zeichenlänge beträgt ${validationConfig.maxLengthPercentage}`;
    }

    if (!values.duration) {
        errors.duration = 'Geben Sie eine Laufzeit an.';
    } else if (values.duration < validationConfig.minDuration) {
        errors.duration = `Die Laufzeit muss mindestens ${validationConfig.minDuration} Jahr betragen.`;
    } else if (values.duration > validationConfig.maxDuration) {
        errors.duration = `Die Laufzeit darf nicht mehr als ${validationConfig.maxDuration} Jahre betragen.`;
    }

    return errors;
}

export { validateForm };