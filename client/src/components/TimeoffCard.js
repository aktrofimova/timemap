import React, { Component } from 'react';

class TimeoffCard extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        here is existing <strong>timeoff</strong>: {this.props.timeoff.name}
      </div>
    );
  }
}

export default TimeoffCard;
