import React, { Component } from 'react';
import axios from 'axios'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField
} from "@material-ui/core";

const projects = [
  {
    value: "retex",
    label: "Retex"
  },
  {
    value: "spectar",
    label: "SpectAR"
  },
  {
    value: "martin-bros",
    label: "Martin Brothers"
  }
];

const positions = [
  {
    value: "dev",
    label: "Developer"
  },
  {
    value: "qa",
    label: "Quality Assurance"
  },
  {
    value: "pm",
    label: "Project Manager"
  }
];

class Signup extends Component {
  state = {
    firstName:'',
    lastName: '',
    email: '',
    password: '',
    project: '',
    position: '',

    passwordConfirmation: '',
    errors: ''
  };

  handleChange = (event) => {
    const {id, value} = event.target
    this.setState({
      [id]: value
    })
  };

  handleProjectChange = event => {
    this.setState({project: event.target.value})
  };

  handlePositionChange = event => {
    this.setState({position: event.target.value})
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {firstName, lastName, email, password, passwordConfirmation} = this.state
    let user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
      .then(response => {
        console.log('response.data', response.data);
        if (response.data.status === 'created') {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors
          })
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
    const customSelect = {
      width: '204px',
      textAlign: 'left'
    };
    return (
      <div>
        <h1>Sign Up</h1>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div>
            <TextField required variant="outlined" id="firstName" label="First Name" onChange={this.handleChange}/>
            <TextField required variant="outlined" id="lastName" label="Last Name" onChange={this.handleChange}/>
          </div>

          <div>
            <div>
              <TextField select id="selectProject" style={customSelect}
                         label="Select Project"
                         value={this.state.project}
                         onChange={this.handleProjectChange}
                         variant="outlined">
                {projects.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField select id="selectPosition" style={customSelect}
                         label="Select Position"
                         value={this.state.position}
                         onChange={this.handlePositionChange}
                         variant="outlined"
              >
                {positions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          <div>
            <TextField required variant="outlined" type="email" id="email" label="E-Mail" onChange={this.handleChange}/>
          </div>

          <div>
            <FormControl required variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                labelWidth={85}
              />
            </FormControl>

            <FormControl required variant="outlined">
              <InputLabel htmlFor="passwordConfirmation">Confirm Password</InputLabel>
              <OutlinedInput
                id="passwordConfirmation"
                type="password"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                labelWidth={140}
              />
            </FormControl>
          </div>

          <div>

          </div>

          <div>
            <Button variant="outlined" color="secondary">Cancel</Button>
            <Button variant="outlined" color="primary" type="submit">Sign Up</Button>
          </div>


        </form>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    );
  }
}
export default Signup;