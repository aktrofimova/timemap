import React, { Component } from 'react';

class TestUsers extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    window.fetch('users')
      .then(response => response.json())
      .then(json => {
        this.setState({users: json});
        // console.log(json);
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        TEST <b>USERS</b> COMPONENT
        {this.state.users.map(user => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>E-Mail: {user.email}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default TestUsers;
