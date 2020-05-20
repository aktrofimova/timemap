import React from 'react';
import 'date-fns';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import { MenuItem, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const NewTask = (props) => {
  const tasks = [{value: 'dev', label: 'Development'},
    {value: 'qa', label: 'Testing'},
    {value: 'meet', label: 'Meeting'},
    {value: 'plan', label: 'Planning'},
    {value: 'ot', label: 'Overtime Hours'},
  ]

  const [name, setName] = React.useState(''),
    [details, setDetails] = React.useState(''),
    [date, setDate] = React.useState(new Date()),
    [startedAt, setStartTime] = React.useState(new Date()),
    [endedAt, setEndTime] = React.useState(new Date()),
    [hours, setHours] = React.useState(msToTime(endedAt.getTime() - startedAt.getTime()));

  const convertToMinutes = (timeRecord) => {
    var h = timeRecord.split(":")[0];
    var m = timeRecord.split(":")[1];
    return (Number(m) + Number(h)*60);
  };

  function msToTime(duration) {
    var m = Math.floor((duration / (1000 * 60)) % 60),
      h = Math.floor((duration / (1000 * 60 * 60)) % 24);

    h = h < 10 ? '0'+h : h;
    m = m < 10 ? '0'+m : m;

    var res = h + ":" + m;
    return res;
  }

  function formatAMPM(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    h = h < 10 ? '0'+h : h;
    m = m < 10 ? '0'+m : m;
    var strTime = h + ':' + m + ampm;
    return strTime;
  };

  const calculateTotalTime = (timeRecords) => {
    var h = [];
    var m = [];
    timeRecords.map((record) => {
      h.push(record.split(":")[0]);
      m.push(record.split(":")[1]);
    });

    h = h.map(x => Number(x));
    m = m.map(x => Number(x));

    var sumHours = h.reduce((a, b) => a + b, 0);
    var sumMinutes = m.reduce((a, b) => a + b, 0);

    var hoursInMinutes = Math.floor(sumMinutes / 60);
    sumHours += hoursInMinutes;
    sumMinutes = sumMinutes % 60;

    var totalTime = ("0" + sumHours).slice(-2) + ':' + ("0" + sumMinutes).slice(-2);
    return totalTime;
  }

  const handleDetailsChange = event => {
    setDetails(event.target.value);
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleHoursChange = event => {
    setHours(event.target.value);
    var diff = convertToMinutes(event.target.value);
    var newEndedAt = new Date(startedAt.getTime() + diff*60000);
    setEndTime(newEndedAt);
  };

  const handleStartTimeChange = newStartedAt => {
    // console.log(formatAMPM(newStartedAt));
    setStartTime(newStartedAt);
    // var newHours = msToTime(endedAt.getTime() - newStartedAt.getTime());
    // setHours(newHours);
  };

  const handleEndTimeChange = newEndedAt => {
    // console.log(formatAMPM(newEndedAt));
    setEndTime(newEndedAt);
    // var newHours = msToTime(newEndedAt.getTime() - startedAt.getTime());
    // setHours(newHours);
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

    let task = {
      display_name: "",
      name_identifier: name,
      user_id: props.currentUser.id,
      details: details,
      date: date,
      hours: hours,
      started_at: startedAt,
      ended_at: endedAt
    };

    axios.post(window.base_api_url + '/tasks', {task}, {withCredentials: true})
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

      <TextField id="hours" className="new_task_field new_task_hours" label="Hours" defaultValue={hours} onChange={handleHoursChange}/>

      <IconButton type="submit" title="Add Task">
        <PlaylistAddOutlinedIcon fontSize="large" className="primary_colour"/>
      </IconButton>
    </form>
  );
}

export default NewTask;







