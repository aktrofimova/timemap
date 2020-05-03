import React, { Component } from 'react';
import NewTask from '../components/NewTask';
import TaskCard from '../components/TaskCard';
import axios from 'axios';

class TaskTracker extends Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    // {withCredentials: true})  allows our Rails server to set and read the cookie on the front-end’s browser. ALWAYS pass this argument!
    setTimeout(() => {
      let base_url = 'http://localhost:3001';

      let id = this.props.match.params.id;
      axios.get(base_url + '/api/users/' + id + '/tasks/',
        {withCredentials: true})
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
