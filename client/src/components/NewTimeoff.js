import React, { Component } from 'react';
import 'date-fns';
import { Button, MenuItem, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const NewTimeoff = () => {
  // const timeoffs = [{value: 'p_vac', label: 'Paid Vacation'},
  //   {value: 'up_vac', label: 'Unpaid Vacation'},
  //   {value: 'p_ill', label: 'Paid Illness'},
  //   {value: 'up_ill', label: 'Unpaid Illness'}
  // ]

  const timeoffs = [{name_identifier: 'vac', label: 'Vacation'},
    {name_identifier: 'ill', label: 'Illness'}
  ]

  const [project, setProject] = React.useState('First Project'),
    [startDate, setStartDate] = React.useState(new Date()),
    [endDate, setEndDate] = React.useState(new Date()),
    [timeoff, setTimeoff] = React.useState(''),
    [nameIdentifier, setNameIdentifier] = React.useState(''),
    [status, setStatus] = React.useState('');

  const handleTimeoffChange = event => {
    setTimeoff(event.target.value);
  };

  const handleNameIdentifierChange = event => {
    setNameIdentifier(event.target.value);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  return (

    <div>
      <div className="new_timeoff">
        <TextField className="new_timeoff_field new_timeoff_select"
                   select id="name_identifier"
                   label="Select Time Off Type"
                  // value={this.state.timeoff}
                   onChange={handleTimeoffChange}>
          {timeoffs.map(option => (
            <MenuItem key={option.name_identifier} value={option.name_identifier}>
              {/*Project Name: {option.label}*/}
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>

          <KeyboardDatePicker
            className="new_timeoff_field new_timeoff_start_date"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            // format="MMM dd, yyyy"
            id="startDate"
            label="Date"
            value={startDate}
            onChange={handleStartDateChange}
          />

          <KeyboardDatePicker
            className="new_timeoff_field new_timeoff_end_date"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            // format="MMM dd, yyyy"
            id="endDate"
            label="Date"
            value={endDate}
            onChange={handleEndDateChange}
          />

        </MuiPickersUtilsProvider>

        <Button style={{maxHeight: '48px', width: '10%'}} variant="outlined">Request</Button>

      </div>
    </div>
  );
}

export default NewTimeoff;















