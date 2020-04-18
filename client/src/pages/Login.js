import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@material-ui/core";
import clsx from "clsx";
import {Visibility, VisibilityOff} from "@material-ui/icons";

class Login extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
    errors: ''
  };

  componentDidMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (event) => {
    const {id, value} = event.target
    this.setState({
      [id]: value
    })
  };

  handleClickShowPassword = () => {
    this.setState((prevState) => {
      return {showPassword: !prevState.showPassword}
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state
    let user = {
      email: email,
      password: password
    }

    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data);
          this.redirect();
        } else {
          this.setState({errors: response.data.errors});
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  };

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField required variant="outlined" type="email" id="email" label="E-Mail" onChange={this.handleChange}/>
          </div>

          <div>
            <FormControl required variant="outlined">
              <InputLabel htmlFor="password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={85}
              />
            </FormControl>
          </div>

          <div>
            <Button variant="outlined" color="secondary">Go to presentation</Button>
            <Button variant="outlined" color="primary" type="submit">Log In</Button>
            <Button variant="outlined" color="default"><Link to='/signup'>Sign up</Link></Button>
          </div>

        </form>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    );
  }
}
export default Login;