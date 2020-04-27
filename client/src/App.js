import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import Timesheet from "./pages/Timesheet";
import Timeoffs from "./pages/Timeoffs";
import TestUsers from './components/TestUsers';
import Header from "./components/Header";

import './App.css';
import './assets/stylesheets/main.scss'

class App extends Component {
  state = {
    isLoggedIn: false,
    user: {},
    project: {}
  };

  componentDidMount() {
    // setTimeout(() => {
      axios.get('http://localhost:3001/logged_in',
        {withCredentials: true}) // This allows our Rails server to set and read the cookie on the front-end’s browser. ALWAYS pass this argument!
        .then(response => {
          if (response.data.logged_in) {
            this.handleLogin(response);
          } else {
            this.handleLogout();
          }
        })
        .catch(error => console.log('api errors:', error))
    // }, 1000)
  }

  handleLogin = (event) => {
    this.setState({
      isLoggedIn: true,
      user: event.data.user,
      project: event.data.user.project
    })
  }
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
      project: {}
    })
  }

  render() {
    return (
      <div className="App">

        <Header loggedInStatus={this.state.isLoggedIn} currentUser={this.state.user} handleLogout={this.handleLogout}/>

        <main className="main">
          {/* with exact the order doesn't matter, w/o exact it does */}
          {/* Switch + order is alternative to exact */}
          <Switch>

            <Route path="/signup" render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
            )} />

            <Route path="/login" render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
            )} />

            <Route exact path="/profile/:id" render={props => (
              <Profile {...props} loggedInStatus={this.state.isLoggedIn}/>
            )} />

            <Route exact path="/project/:id" render={props => (
              <Project {...props} loggedInStatus={this.state.isLoggedIn}/>
            )} />

            <Route exact path="/profile/:id/timesheet" render={props => (
              <Timesheet {...props} loggedInStatus={this.state.isLoggedIn}/>
            )} />

            <Route exact path="/profile/:id/timeoffs" render={props => (
              <Timeoffs {...props} loggedInStatus={this.state.isLoggedIn}/>
            )} />

            <Route path="/users" component={TestUsers}></Route>

            <Route path="/" render={props => (
              <Home {...props} loggedInStatus={this.state.isLoggedIn}/>
            )} />

          </Switch>
        </main>


      </div>
    );
  }
}

export default App;