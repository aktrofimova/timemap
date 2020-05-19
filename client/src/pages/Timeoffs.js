import React, { Component } from 'react';
import NewTimeoff from '../components/NewTimeoff';
import TimeoffCard from '../components/TimeoffCard';
import axios from 'axios';

class Timeoffs extends Component {
  state = {
    timeoffs: [],
    user: {},
    isSameUser: false,
    isManager: false
  }

  componentDidMount() {
    let params = '?sort=desc';
    let id = this.props.match.params.id;

    setTimeout(() => {
      axios.get(window.base_api_url + '/users/' + id + '/timeoffs' + params,
        {withCredentials: true})
        .then(response => {
          this.setState({timeoffs: response.data.timeoffs});
        })
        .catch(error => console.log('api errors:', error));

      axios.get(window.base_api_url + '/users/' + id,
        {withCredentials: true})
        .then(response => {
          this.setState({user: response.data.user});
        })
        .catch(error => console.log('api errors:', error));

      if (this.props.currentUser.id == this.props.match.params.id)
        this.setState({isSameUser: true});
    }, 500)
  }

  getDateInWords = (rawDate) => {
    var date = new Date(rawDate) || new Date();
    var dateArr = date.toDateString().split(' ');
    return dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
  }

  render() {
    return (
      <div className="timeoffs page">
        <h1 className="header timeoffs_header">Time Offs: {this.state.user.name}</h1>

        {this.state.isSameUser ? <NewTimeoff className="timeoffs_new" currentUser={this.props.currentUser}/> : null }
        <p style={{borderBottom: '1px solid #ccc', paddingBottom: '15px'}}></p>
        <div className="timeoffs_all">
          {this.state.timeoffs.map((timeoff) => <TimeoffCard key={timeoff.id} currentUser={this.props.currentUser} isSameUser={this.state.isSameUser} timeoff={timeoff}/>)}
        </div>
      </div>
    );
  }
}

export default Timeoffs;
