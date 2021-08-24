import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

function RepaymentScheduleTable(props) {
    return (
        <div className="table-wrapper">
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell align="right">Restschuld</TableCell>
                            <TableCell align="right">Zinsen</TableCell>
                            <TableCell align="right">Tilgung(+) / Auszahlung(-)</TableCell>
                            <TableCell align="right">Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="right">{row.loan}</TableCell>
                                <TableCell align="right">{row.interest}</TableCell>
                                <TableCell align="right">{row.repayment}</TableCell>
                                <TableCell align="right">{row.rate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export { RepaymentScheduleTable };