import React, { Component } from 'react';

class TaskCard extends Component {
  state = {
    task: {

    }

  }

  componentDidMount() {

  }

  render() {
    var displayTimeRange = this.props.task.started_at && this.props.task.ended_at;


    return (
      <div className="task" data-id={this.props.task.id}>
          <p className="task_name task_item">{this.props.task.project + ': ' + this.props.task.display_name}</p>
          <p className="task_details task_item">{this.props.task.details}</p>

          <div className="task_right">
            {displayTimeRange ? <p className="task_time task_item"><span>{this.props.task.started_at}</span> - <span>{this.props.task.ended_at}</span></p> : null}
            <p className="task_hours task_item">{this.props.task.hours}</p>
          </div>

      </div>
    );
  }
}

export default TaskCard;
