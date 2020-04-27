import React, { Component } from 'react';

class TaskCard extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        here is existing <strong>task</strong>: {this.props.task.name}
      </div>
    );
  }
}

export default TaskCard;
