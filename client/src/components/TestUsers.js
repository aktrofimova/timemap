import React, { Component } from 'react';


class TestUsers extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    window.fetch('users')
      .then(response => response.json())
      .then(json => this.setState({users: json.users}))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        TEST <b>USERS</b> COMPONENT
        {this.state.users.map(user => (
          <div key={user.id} style={{boxShadow: '0 0 5px rgba(0,0,0,0.5)', textAlign: 'left', paddingLeft: '200px'}}>
            <p><span style={{marginRight: '20px'}}>Name:</span><span>{user.first_name}</span></p>
            <p><span style={{marginRight: '20px'}}>Name:</span><span>{user.last_name}</span></p>
            <p><span style={{marginRight: '20px'}}>E-Mail:</span><span>{user.email}</span></p>
            <p><span style={{marginRight: '20px'}}>Pass:</span><span>{user.password_digest}</span></p>
          </div>
        ))}
      </div>
    );
  }
}

export default TestUsers;
