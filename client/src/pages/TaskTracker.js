import React, { Component } from 'react';
import NewTask from '../components/NewTask';
import TaskCard from '../components/TaskCard';
import axios from 'axios';

class TaskTracker extends Component {
  state = {
    tasks: [],
    user: {},
    isSameUser: false,
  }

  componentDidMount() {
    // {withCredentials: true})  allows our Rails server to set and read the cookie on the front-end’s browser. ALWAYS pass this argument!
    let params = '?sort=desc&group=true';
    let id = this.props.match.params.id;

    setTimeout(() => {
      axios.get(window.base_api_url + '/users/' + id + '/tasks' + params,
        {withCredentials: true})
        .then(response => {
          this.setState({tasks: response.data.tasks});
        })
        .catch(error => console.log('api errors:', error));

      axios.get(window.base_api_url + '/users/' + id,
        {withCredentials: true})
        .then(response => {
          this.setState({user: response.data.user});
        })
        .catch(error => console.log('api errors:', error));

      if (this.props.currentUser.id == this.props.match.params.id)
        this.setState({isSameUser: true});
    }, 500);
  }

  getDateInWords = (rawDate) => {
    var date = new Date(rawDate) || new Date();
    var dateArr = date.toDateString().split(' ');
    return dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
  }

  calculateTotalTime = (timeRecords) => {
    var hours = [];
    var minutes = [];
    timeRecords.map((record) => {
      hours.push(record.split(":")[0]);
      minutes.push(record.split(":")[1]);
    });

    hours = hours.map(h => Number(h));
    minutes = minutes.map(m => Number(m));

    var sumHours = hours.reduce((a, b) => a + b, 0);
    var sumMinutes = minutes.reduce((a, b) => a + b, 0);

    var hoursInMinutes = Math.floor(sumMinutes / 60);
    sumHours += hoursInMinutes;
    sumMinutes = sumMinutes % 60;

    var totalTime = ("0" + sumHours).slice(-2) + ':' + ("0" + sumMinutes).slice(-2);
    return totalTime;
  }

  render() {
    let blocks = [];
    { for (let [key, value] of Object.entries(this.state.tasks)) {
      var timeRecords = [];
      value.map((val)=>{timeRecords.push(val.hours)});

      blocks.push(<div key={key} className="tasks_block">
        <div className="tasks_up">
          <p>{this.getDateInWords(key)}</p>
          <p className={this.state.isSameUser ? "tasks_total_time_shift" : "tasks_total_time"}><span style={{fontSize: '14px'}}>Total time:</span> <span className="time_record primary_colour">{this.calculateTotalTime(timeRecords)}</span></p>
        </div>
        <div className="tasks_down">
          {value.map((task) => <TaskCard key={task.id} task={task} currentUser={this.props.currentUser} isSameUser={this.state.isSameUser}/>)}
        </div>
      </div>)
    }}

    return (
      <div className="tasks page">
        <h1 className="header tasks_header">Task Tracker: {this.state.user.name}</h1>

        {this.state.isSameUser ? <NewTask className="tasks_new" currentUser={this.props.currentUser}/> : null }
        <p style={{borderBottom: '1px solid #ccc', paddingBottom: '15px'}}></p>
        <div className="tasks_all">
          {blocks.map(block => block) || null}
        </div>
      </div>
    );
  }
}

export default TaskTracker;
