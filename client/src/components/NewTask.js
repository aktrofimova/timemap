import React, { Component } from 'react';
import 'date-fns';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';


const tasks = [{value: 'dev', label: 'Development'},
  {value: 'qa', label: 'Testing'},
  {value: 'ot', label: 'Overtime Hours'},
]

class NewTask extends Component {
  state = {
    project: "First Project",
    task: '',
    started_at: new Date(),
    ended_at: new Date(),
    date: '',
    hours: ''

  }

  componentDidMount() {

  }

  handleChange = (event) => {
    const {id, value} = event.target
    this.setState({
      [id]: value
    })
  };

  handleTaskChange = event => {
    this.setState({task: event.target.value})
  };

  handleStartTimeChange = event => {
    this.setState({started_at: event.getTime()});
  };

  handleEndTimeChange = event => {
    this.setState({ended_at: event.getTime()});
  };

  handleDateChange = event => {
    this.setState({date: event.target.value});
  };



  getDate = (rawDate) => {
    var date = rawDate || new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  getDateInWords = (rawDate) => {
    var date = new Date(rawDate) || new Date();
    var dateArr = date.toDateString().split(' ');
    return dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
  }


  render() {
    return (
      <div className="new_task">
        <TextField className="new_task_field new_task_select"
                   select id="selectTask"
                   label="Select Task"
                   // value={this.state.task}
                   onChange={this.handleTaskChange}>
          {tasks.map(option => (
            <MenuItem key={option.value} value={option.value}>
              Project Name: {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField id="details" className="new_task_field new_task_details" label="Details" onChange={this.handleChange}/>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>

          <KeyboardTimePicker
            id="startedAt"
            className="new_task_field new_task_time"
            // style={{maxWidth: '250px'}}
            label="Started At"
            // placeholder={this.state.started_at}
            onChange={this.handleStartTimeChange}
          />

          <KeyboardTimePicker
            id="endedAt"
            className="new_task_field new_task_time"
            label="Ended At"
            // placeholder={this.state.started_at}
            onChange={this.handleEndTimeChange}
          />

          <KeyboardDatePicker
            className="new_task_field new_task_date"
            disableToolbar
            variant="inline"
            format="MMM dd, yyyy"
            id="date"
            label="Date"
            value={this.getDate()}
            onChange={this.handleDateChange}
          />

        </MuiPickersUtilsProvider>

        <TextField id="hours" className="new_task_field new_task_hours" label="Hours" defaultValue="05:15" onChange={this.handleChange}/>

        <Button variant="outlined">Add Task</Button>

      </div>
    );
  }
}

export default NewTask;
