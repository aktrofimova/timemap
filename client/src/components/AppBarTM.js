import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Logo from '../components/Logo';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';


const menuSeparator = <pre>  |  </pre>;

class AppBarTM extends Component {
  state = {
    currentPath: '',
    loggedIn: true
  }

  componentDidMount() {
    this.setState({currentPath: window.location.pathname});
  }

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          {/*<IconButton edge="start" className="menu_btn" color="inherit" aria-label="menu">*/}
            {/*<MenuIcon />*/}
          {/*</IconButton>*/}
          <Logo />{menuSeparator}
          <Typography variant="h6" className="title">
            {this.state.currentPath == '/' ? "TimeMap" : "Presentation"}
          </Typography>{menuSeparator}
          {this.state.loggedIn ?
            <Aux><Typography variant="h6" className="title">Timesheet</Typography>{menuSeparator}</Aux> : null}
          <IconButton edge="end" className="account_btn" color="inherit" aria-label="menu">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppBarTM;
