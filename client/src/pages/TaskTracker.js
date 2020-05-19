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

  render() {
    let blocks = [];
    { for (let [key, value] of Object.entries(this.state.tasks)) {
      blocks.push(<div key={key} className="tasks_block">
        <div className="tasks_up">
          <p>{this.getDateInWords(key)}</p>
          {/*<p><span style={{fontSize: '14px'}}>Total time:</span> <span>00:00</span></p>*/}
        </div>
        <div className="tasks_down">
          {value.map((task) => <TaskCard key={task.id} task={task}/>)}
        </div>
      </div>)
    }}

    return (
      <div className="tasks page">
        <h1 className="header tasks_header">Task Tracker: {this.state.user.name}</h1>

        {this.state.isSameUser ? <NewTask className="tasks_new"/> : null }
        <p style={{borderBottom: '1px solid #ccc', paddingBottom: '15px'}}></p>
        {blocks.map(block => block) || null}
      </div>
    );
  }
}

export default TaskTracker;
