import React, { Component } from 'react';
import NewTask from '../components/NewTask';
import TaskCard from '../components/TaskCard';

class Timesheet extends Component {
  state = {
    user: {
      name: "John Doe",
      tasks: [{id: 1, name: 'first task'}, {id: 2, name: 'second task'}]
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="tasks page">
        <h1 className="header tasks_header">Timesheet: {this.state.user.name}</h1>

        <NewTask className="tasks_new"/>
        <p></p>
        <div className="tasks_all">
          {this.state.user.tasks.map((task) => <TaskCard key={task.id} task={task}/>)}
        </div>
      </div>
    );
  }
}

export default Timesheet;
