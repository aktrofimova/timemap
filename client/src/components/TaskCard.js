import React, { Component } from 'react';

class TaskCard extends Component {
  state = {
    task: {
      name: 'First Project: Development',
      details: "some details",
      started_at: "started_at",
      ended_at: "ended_at",
      date: "date",
      hours: "hours",
    }

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="task_carr">
        <div className="task_card_up">
          <p>today | Thu, 30th Apr</p>
          <p>Total time: <span>00:45</span></p>
        </div>
        <div className="task_card_down">
          <p>{this.state.task.name}</p>
          <p>{this.state.task.details}</p>
          <p><span>{this.state.task.started_at}</span> - <span>{this.state.task.ended_at}</span></p>
          <p><span>{this.state.task.started_at}</span> - <span>{this.state.task.ended_at}</span></p>
          <p>{this.state.task.date}</p>
          <p>{this.state.task.hours}</p>
        </div>
      </div>
    );
  }
}

export default TaskCard;
