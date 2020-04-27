import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class UserCard extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    let displayUser = this.props.displayUser;
    let email = this.props.displayUser.email;

    return (
        <Link className="user_card" to="/profile/:user_id">
          <div className="user_card_left" >
            <div style={{display: 'inline-block', width: '100px', height: '100px', border: '1px solid black'}}>image here</div>
          </div>
          <div className="user_card_right">
            <p className="user_card_name">{displayUser.name}</p>
            <p>{email}</p>
            {displayUser.position ? <p>{displayUser.position}</p> : null}
          </div>

        </Link>
    );
  }
}

export default UserCard;
