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
    var displayTimeRange = this.props.task.started_at && this.props.task.ended_at;


    return (
      <div className="task">
        <div className="task_up">
          <p>{this.props.task.date}</p>
          <p><span style={{fontSize: '14px'}}>Total time:</span> <span>00:00</span></p>
        </div>
        <div className="task_down">
          <p className="task_name task_item">{this.props.task.project + ': ' + this.props.task.display_name}</p>
          <p className="task_details task_item">{this.props.task.details}</p>

          <div className="task_right">
            {displayTimeRange ? <p className="task_time task_item"><span>{this.props.task.started_at}</span> - <span>{this.props.task.ended_at}</span></p> : null}
            {/*<p className="task_">{this.props.task.date}</p>*/}
            <p className="task_hours task_item">{this.props.task.hours}</p>
          </div>

        </div>
      </div>
    );
  }
}

export default TaskCard;
