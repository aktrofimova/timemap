import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class UserCard extends Component {
  state = {
    timeoffs: []
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get(window.base_api_url + '/users/' + this.props.displayUser.id + '/timeoffs',
        {withCredentials: true})
        .then(response => {
          this.setState({timeoffs: response.data.timeoffs});
        })
        .catch(error => console.log('api errors:', error))
    }, 500)
  }

  render() {
    let displayUser = this.props.displayUser,
      email = displayUser.email,
      timeoffs = this.state.timeoffs,
      hasPending = timeoffs.find(timeoff => timeoff.status == 'pending'),
      hasconflict = timeoffs.find(timeoff => timeoff.status == 'conflict');

    return (
        <Link className="user_card" to={"/profile/" + displayUser.id} data-id={displayUser.id}>
          {this.props.allowIndicator && (hasPending || hasconflict) ? <div className="user_card_timeoff_indicator"></div> : null}
          <div className="user_card_role_indicator">{this.props.displayUser.role}</div>
          <div className="user_card_left" >
            {/* image here*/}
            <div style={{display: 'inline-block', width: '100px', height: '100px', border: '1px solid #ebebeb', backgroundColor: '#ebebeb'}}></div>
          </div>
          <div className="user_card_right">
            <p className="user_card_name">{displayUser.name}</p>
            <p className="">{email}</p>
            {displayUser.position ? <p>{displayUser.position}</p> : null}
          </div>

        </Link>
    );
  }
}

export default UserCard;
