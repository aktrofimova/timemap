import React, { Component } from 'react';
import NewTimeoff from '../components/NewTimeoff';
import TimeoffCard from '../components/TimeoffCard';

class Timeoffs extends Component {
  state = {
    user: {
      name: "John Doe",
      timeoffs: [{id: 1, name: 'first timeoff'}, {id: 2, name: 'second timeoff'}]
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="timeoffs page">
        <h1 className="header timeoffs_header">Time Offs: {this.state.user.name}</h1>

        <NewTimeoff className="timeoffs_new"/>
        <p></p>
        <div className="timeoffs_all">
          {this.state.user.timeoffs.map((timeoff) => <TimeoffCard key={timeoff.id} timeoff={timeoff}/>)}
        </div>
      </div>
    );
  }
}

export default Timeoffs;
