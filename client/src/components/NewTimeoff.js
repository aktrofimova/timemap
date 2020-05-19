import React, { Component } from 'react';
import 'date-fns';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import { Button, MenuItem, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const NewTimeoff = (props) => {
  // const timeoffs = [{value: 'p_vac', label: 'Paid Vacation'},
  //   {value: 'up_vac', label: 'Unpaid Vacation'},
  //   {value: 'p_ill', label: 'Paid Illness'},
  //   {value: 'up_ill', label: 'Unpaid Illness'}
  // ]

  const timeoffs = [{name_identifier: 'vac', label: 'Vacation'},
    {name_identifier: 'ill', label: 'Illness'}
  ]

  const [startDate, setStartDate] = React.useState(new Date()),
    [endDate, setEndDate] = React.useState(new Date()),
    [name, setName] = React.useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handleSubmit = event => {
    event.preventDefault();

    let timeoff = {
      name_identifier: name,
      user_id: props.currentUser.id,
      start_date: startDate,
      end_date: endDate
    };

    axios.post(window.base_api_url + '/timeoffs', {timeoff}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          console.log('timeoff created');
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))


  };

  return (

    <div>
      <form className="new_timeoff" onSubmit={handleSubmit}>
        <TextField className="new_timeoff_field new_timeoff_select"
                   select id="name_identifier"
                   label="Select Time Off Type"
                  // value={this.state.timeoff}
                   onChange={handleNameChange}>
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

        <IconButton type="submit" title="Request Time Off">
          <PlaylistAddOutlinedIcon fontSize="large" className="primary_colour"/>
        </IconButton>

      </form>
    </div>
  );
}

export default NewTimeoff;















