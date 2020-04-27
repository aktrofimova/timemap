import React, { Component } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';


class Project extends Component {

  constructor(props){
    super(props);
    this.state = {
      project: {},
      users: []
    };
  }
  componentDidMount() {
    setTimeout(() => {
      let id = this.props.match.params.id;
      axios.get('http://localhost:3001/api/projects/' + id,
        {withCredentials: true}) // This allows our Rails server to set and read the cookie on the front-end’s browser. ALWAYS pass this argument!
        .then(response => {
          // console.log(response.data);
          this.setState({
            project: response.data.project,
            users: response.data.project.users});
        })
        .catch(error => console.log('api errors:', error))
    }, 1000)
  }

  render() {
    return (
      <div className="project page">
        <h1 className="header project_header">{this.state.project.display_name}</h1>
        <p>{this.state.project.details}</p>

        <div className="project_users">
          <h3 className="project_members">Members ({this.state.project.members_count}):</h3>
          {this.state.users.map(user =>
            <UserCard key={user.id} displayUser={user} />
          )}
        </div>
      </div>
    );
  }
}

export default Project;
