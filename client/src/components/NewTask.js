import React from 'react';
import 'date-fns';
import axios from 'axios';
import { Button, MenuItem, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const NewTask = () => {
  const tasks = [{value: 'dev', label: 'Development'},
    {value: 'qa', label: 'Testing'},
    {value: 'ot', label: 'Overtime Hours'},
  ]

  const [project, setProject] = React.useState(''),
    [name, setName] = React.useState(''),
    [hours, setHours] = React.useState(''),
    [details, setDetails] = React.useState(''),
    [date, setDate] = React.useState(new Date()),
    [startedAt, setStartTime] = React.useState(new Date()),
    [endedAt, setEndTime] = React.useState(new Date());

  const handleDetailsChange = event => {
    setDetails(event.target.value);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleHoursChange = event => {
    setHours(event.target.value);
  };

  const handleStartTimeChange = startedAt => {
    setStartTime(startedAt);
  };

  const handleEndTimeChange = endedAt => {
    setEndTime(endedAt);
  };

  const handleDateChange = date => {
    setDate(date);
  };

  const getDate = (rawDate) => {
    var date = rawDate || new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  const getDateInWords = (rawDate) => {
    var date = new Date(rawDate) || new Date();
    var dateArr = date.toDateString().split(' ');
    return dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event);

    let userId = 1;

    let task = {
      display_name: "",
      name_identifier: name,
      user_id: userId,
      details: details,
      date: date,
      hours: hours,
      started_at: startedAt,
      ended_at: endedAt,
    };

    let params = '';

    axios.post(window.base_api_url + '/tasks' + params, {task}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          console.log('task created');
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))


  };

  return (
    <form className="new_task" onSubmit={handleSubmit}>
      <TextField className="new_task_field new_task_select"
                 select id="selectTask"
                 label="Select Task"
                  // value={this.state.task}
                 onChange={handleNameChange}>
        {tasks.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {/*Project Name: {option.label}*/}
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField id="details" className="new_task_field new_task_details" label="Details" onChange={handleDetailsChange}/>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          id="startedAt"
          className="new_task_field new_task_time"
          label="Started At"
          value={startedAt}
          onChange={handleStartTimeChange}
        />

        <KeyboardTimePicker
          id="endedAt"
          className="new_task_field new_task_time"
          label="Ended At"
          value={endedAt}
          onChange={handleEndTimeChange}
        />

        <KeyboardDatePicker
          className="new_task_field new_task_date"
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          // format="MMM dd, yyyy"
          id="date"
          label="Date"
          value={date}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>

      <TextField id="hours" className="new_task_field new_task_hours" label="Hours" defaultValue="00:00" onChange={handleHoursChange}/>

      <Button style={{maxHeight: '48px', width: '10%'}} variant="outlined" type="submit">Add Task</Button>

    </form>

  );
}

export default NewTask;







