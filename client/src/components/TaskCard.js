import React, { Component } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class TaskCard extends Component {
  state = {
    task: {

    }

  }

  componentDidMount() {

  }

  deleteTask() {
    console.log('this.props.task.id', this.props.task.id)


  }

  render() {
    var displayTimeRange = this.props.task.started_at && this.props.task.ended_at;


    return (
      <div className="task" data-id={this.props.task.id}>
          <p className="task_name task_item">{this.props.task.project + ': '} <span className="primary_colour">{this.props.task.display_name}</span></p>
          <p className="task_details task_item">{this.props.task.details}</p>

          <div className="task_right">
            {displayTimeRange ? <p className="task_time task_item"><span>{this.props.task.started_at}</span> - <span>{this.props.task.ended_at}</span></p> : null}
            <p className="task_hours task_item">{this.props.task.hours}</p>
            <IconButton className="task_delete" onClick={()=>{axios.delete(window.base_api_url + '/tasks/' + this.props.task.id);}}><DeleteIcon fontSize="small"/></IconButton>
          </div>

      </div>
    );
  }
}

export default TaskCard;
