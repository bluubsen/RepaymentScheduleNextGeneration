import { useState } from 'react';
import './App.css';
import { RepaymentScheduleForm } from './RepaymentSchedule/RepaymentScheduleForm.js';
import { RepaymentScheduleTable } from './RepaymentSchedule/RepaymentScheduleTable.js';
import { calculateRepaymentSchedule } from './RepaymentSchedule/repaymentScheduleCalculation.js';

function App() {
  const [rows, setRows] = useState([]);

  const addValues = val => {
    if (val === null) {
      setRows([]);
      return;
    }
    const rowsToDisplay = calculateRepaymentSchedule(val);
    setRows(rowsToDisplay);
  }

  return (
    <div className="App" >
      <header className="App-header">
        <div className="logo-wrapper">
          <img src="https://meinfinn.de/verbraucher/img/finn-logo-ws.svg" className="App-logo" alt="logo" />
        </div>
      </header>
      <RepaymentScheduleForm addValues={addValues}></RepaymentScheduleForm>
      <RepaymentScheduleTable rows={rows}></RepaymentScheduleTable>
    </div >
  );
}

export default App;
