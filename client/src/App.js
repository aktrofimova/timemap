import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Presentation from './pages/Presentation';
// import SignUpMine from './pages/SignUp';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TestUsers from './components/TestUsers';
import AppBarTM from "./components/AppBarTM";

import './App.css';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: {},
    snackMessage: ""
  };

  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in',
      {withCredentials: true}) // This allows our Rails server to set and read the cookie on the front-end’s browser. ALWAYS pass this argument!
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  }

  render() {
    return (
      <div className="App">

        <AppBarTM loggedInStatus={this.state.isLoggedIn} handleLogout={this.handleLogout}/>

        <main style={{marginTop: "94px"}}>
          {/* with exact the order doesn't matter, w/o exact it does */}
          {/* Switch + order is alternative to exact */}
          <Switch>

            <Route path="/signup" render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
            )} />

            <Route path="/login" render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
            )} />

            <Route path="/users" component={TestUsers}></Route>

            <Route path="/" component={Presentation}></Route>

          </Switch>
        </main>

      </div>
    );
  }
}

export default App;