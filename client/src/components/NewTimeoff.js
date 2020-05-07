import React, { Component } from 'react';
import 'date-fns';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

// const timeoffs = [{value: 'p_vac', label: 'Paid Vacation'},
//   {value: 'up_vac', label: 'Unpaid Vacation'},
//   {value: 'p_ill', label: 'Paid Illness'},
//   {value: 'up_ill', label: 'Unpaid Illness'}
// ]

const timeoffs = [{name_identifier: 'vac', label: 'Vacation'},
  {name_identifier: 'ill', label: 'Illness'}
]

class NewTimeoff extends Component {
  state = {
    project: "First Project",
    timeoff: '',
    name_identifier: '',
    start_date: new Date(),
    end_date: new Date(),
    status: ''
  }

  componentDidMount() {

  }

  handleChange = (event) => {
    const {id, value} = event.target
    this.setState({
      [id]: value
    })
  };

  handleTimeoffChange = event => {
    this.setState({timeoff: event.target.value})
  };

  handleStartDateChange = event => {
    // this.setState({end_date: event.getDate()});
    this.setState({start_date: this.getDate(event)}); // !!!!!!!
  };

  handleEndDateChange = event => {
    // this.setState({end_date: event.getDate()});
    this.setState({end_date: this.getDate(event)}); // !!!!!!!
  };

  getDate = (rawDate) => {
    var date = rawDate || new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  render() {
    return (
      <div>
        <div className="new_timeoff">
          <TextField className="new_timeoff_field new_timeoff_select"
                     select id="name_identifier"
                     label="Select Time Off Type"
            // value={this.state.timeoff}
                     onChange={this.handleTimeoffChange}>
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
              format="MMM dd, yyyy"
              id="start_date"
              label="Date"
              value={this.getDate()}
              onChange={this.handleStartDateChange}
            />

            <KeyboardDatePicker
              className="new_timeoff_field new_timeoff_end_date"
              disableToolbar
              variant="inline"
              format="MMM dd, yyyy"
              id="end_date"
              label="Date"
              value={this.getDate()}
              onChange={this.handleEndDateChange}
            />

          </MuiPickersUtilsProvider>

          <Button variant="outlined">Request</Button>

        </div>





      </div>
    );
  }
}

export default NewTimeoff;
