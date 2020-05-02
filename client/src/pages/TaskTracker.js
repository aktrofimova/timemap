import React, { Component } from 'react';
import NewTask from '../components/NewTask';
import TaskCard from '../components/TaskCard';
import axios from 'axios';

class TaskTracker extends Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    setTimeout(() => {
      let id = this.props.match.params.id;
      axios.get('http://localhost:3001/api/users/' + id + '/tasks/',
        {withCredentials: true}) // This allows our Rails server to set and read the cookie on the front-end’s browser. ALWAYS pass this argument!
        .then(response => {
          this.setState({tasks: response.data.tasks});
        })
        .catch(error => console.log('api errors:', error))
    }, 500)
  }

  render() {
    return (
      <div className="tasks page">
        <h1 className="header tasks_header">Task Tracker: {this.props.currentUser.name}</h1>

        <NewTask className="tasks_new"/>
        <p style={{borderBottom: '1px solid #ccc', paddingBottom: '15px'}}></p>
        <div className="tasks_all">
          {this.state.tasks.map((task) => <TaskCard key={task.id} task={task}/>)}
        </div>
      </div>
    );
  }
}

export default TaskTracker;
