import { useState } from 'react';
import { makeStyles, TextField, InputAdornment, Button } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { validateForm } from './validateForm.js';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textfield: {
    marginTop: '1rem',
    textAlign: 'right',
    '& .MuiInputBase-input': {
      textAlign: 'right',
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
  },
  button: {
    marginTop: '1rem',
  }
});

function RepaymentScheduleForm(props) {
  const [values, setValues] = useState({
    loan: '',
    interest: '',
    repayment: '',
    duration: '',
  });
  const [errors, setErrors] = useState({});
  const styles = useStyles();
  const validationConfig = {
    maxLengthPercentage: 5,
    minLoan: 1000,
    maxLoan: 10000000000,
    minInterest: 0,
    maxInterest: 100,
    minRepayment: 0,
    maxRepayment: 100,
    minDuration: 1,
    maxDuration: 100,
  }

  const handleChange = ev => {
    const { name, value } = ev.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const e = validateForm(values, validationConfig);
    setErrors(e);
    if (Object.entries(e).length === 0) {
      props.addValues(values);
    } else {
      props.addValues(null);
    }
  }

  return (
    <div className="form-wrapper">
      <form className={styles.form} autoComplete='off'>
        <CurrencyTextField
          id='loan'
          name='loan'
          label='Darlensbetrag'
          variant='standard'
          value={values.loan}
          className={styles.textfield}
          currencySymbol='€'
          outputFormat='number'
          decimalCharacter=','
          digitGroupSeparator='.'
          onChange={(ev, value) => setValues({ ...values, [ev.target.name]: value })}
          error={errors.loan !== undefined}
          helperText={errors.loan}
        />
        <TextField
          id='interest'
          name='interest'
          type='number'
          value={values.interest}
          className={styles.textfield}
          label='Sollzins'
          onChange={handleChange}
          error={errors.interest !== undefined}
          helperText={errors.interest}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
          required />
        <TextField
          id='repayment'
          name='repayment'
          type='number'
          value={values.repayment}
          className={styles.textfield}
          label='anfängliche Tilgung'
          onChange={handleChange}
          error={errors.repayment !== undefined}
          helperText={errors.repayment}
          InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment>, }}
          required />
        <TextField
          id='duration'
          name='duration'
          type='number'
          value={values.duration}
          className={styles.textfield}
          label='Zinsbindung'
          onChange={handleChange}
          error={errors.duration !== undefined}
          helperText={errors.duration}
          InputProps={{ startAdornment: <InputAdornment position="start">Jahre</InputAdornment>, }}
          required />
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit} className={styles.button}>
          Berechnen
        </Button>
      </form>
    </div>
  );
}

export { RepaymentScheduleForm };