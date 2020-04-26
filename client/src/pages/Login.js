import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@material-ui/core";
// import clsx from "clsx";
import {Visibility, VisibilityOff} from "@material-ui/icons";

class Login extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
    errors: ''
  };

  componentDidMount() {
    // TM-18: why it doesn't work???
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
          this.props.handleLogin(response);
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
      <div className="login">
        <h1 className="header login_header">Log In</h1>
        <form className="form login_form" onSubmit={this.handleSubmit}>
            <TextField className="form_input" required variant="outlined" type="email" id="email" label="E-Mail" onChange={this.handleChange}/>

            <FormControl className="form_input" required variant="outlined" >
              <InputLabel htmlFor="password">Password</InputLabel>
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


          <div className="form_block form_buttons">
            {/*<Button className="login_back" variant="outlined">Back</Button>*/}
            {/*<Button className="login_submit" variant="outlined" type="submit">Log In</Button>*/}
            <button onClick={() => window.history.back()} className="form_cancel">Back</button>
            <button className="form_submit" type="submit">Log In</button>
          </div>
          <p className="form_txt">Do not have an account? <Link className="cta_link" to='/signup'>Sign up</Link></p>

        </form>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    );
  }
}
export default Login;