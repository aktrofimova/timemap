import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get('http://localhost:3001/api/users/' + this.props.user.id,
        {withCredentials: true}) // This allows our Rails server to set and read the cookie on the front-end’s browser. ALWAYS pass this argument!
        .then(response => {
          this.setState({user: response.data.user});
        })
        .catch(error => console.log('api errors:', error))
    }, 1000)
  }

  render() {
    let user = this.state.user;
    let email = user.email;
    let mailto = "mailto: " + email;

    return (
      <div className="profile page">
        <h1 className="header profile_header">Profile</h1>

        <div className="profile_content">
          <div className="profile_left">
            <div style={{display: 'inline-block', width: '100px', height: '100px', border: '1px solid black'}}>image here</div>
            <p>Vacation days: {user.vac_days_left}</p>
            <Link className="cta_btn secondary profile_button" to="/edit">Edit profile</Link>
          </div>

          <div className="profile_right">
            <p className="profile_name">{user.name}</p>
            <p><Link className="cta_link primary" to={mailto}>{email}</Link></p>
            {user.project ? <p><Link className="cta_link secondary" to="/project">{user.project.display_name}</Link></p> : null}
            {user.position ? <p>{user.position}</p> : null}

            <div>
              <Link className="cta_link secondary" to="/timesheet">Timesheet</Link>
              <Link className="cta_link secondary" to="/timeoffs">Time Offs</Link>
            </div>
          </div>
        </div>



      </div>
    );
  }
}

export default Profile;
