import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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

const roles = [
  {
    value: "employee",
    label: "Employee"
  },
  {
    value: "manager",
    label: "Manager"
  },
  {
    value: "client",
    label: "Client"
  }
];

class Signup extends Component {
  state = {
    firstName:'',
    lastName: '',
    email: '',
    password: '',
    project: '',
    role: '',

    passwordConfirmation: '',
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

  handleProjectChange = event => {
    this.setState({project: event.target.value})
  };

  handleRoleChange = event => {
    this.setState({role: event.target.value})
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
    axios.post('http://localhost:3001/api/users', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleLogin(response.data)
          this.redirect('/profile');
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  redirect = (path) => {
    this.props.history.push(path)
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
      <div className="signup page">
        <h1 className="header signup_header">Sign Up</h1>
        <form className="form signup_form" autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form_block">
            <TextField className="form_input" required variant="outlined" id="name" label="Name" onChange={this.handleChange}/>
            <TextField className="form_input" required variant="outlined" type="email" id="email" label="E-Mail" onChange={this.handleChange}/>
          </div>

          <div className="form_block">
            <FormControl className="form_input" required variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                labelWidth={85}
              />
            </FormControl>

            <FormControl className="form_input" required variant="outlined">
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

          <div className="form_block">
              <TextField className="form_input"
                         select id="selectProject"
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

            <TextField className="form_input" variant="outlined" id="position" label="Position" onChange={this.handleChange}/>
          </div>

          <TextField className="form_input single"
                     select id="selectRole"
                     label="Select Role"
                     value={this.state.role}
                     onChange={this.handleRoleChange}
                     variant="outlined"
          >
            {roles.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <div className="form_block form_buttons">
            <button onClick={() => window.history.back()} className="form_cancel">Cancel</button>
            <button className="form_submit" type="submit">Sign Up</button>
          </div>
          <p className="form_txt">Already have an account? <Link className="cta_link primary" to='/login'>Log In</Link></p>


        </form>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    );
  }
}
export default Signup;