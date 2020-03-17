import React, { useState }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Aux from '../hoc/Aux';
import Logo from '../components/Logo';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem }from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';


const menuSeparator = <pre>  |  </pre>;

const AppBarTM = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPath] = useState(window.location.pathname);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'profile-menu';

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
      .then(response => {
        props.handleLogout()
        props.history.push('/')
      })
      .catch(error => console.log(error))
  }

    const menuItems = props.loggedInStatus ? [
      <MenuItem key="profile" onClick={handleProfileMenuClose}>Profile</MenuItem>,
      <MenuItem key="logout" onClick={handleLogout}><Link to="/">Log out</Link></MenuItem>
    ] :
    [
      <MenuItem key="login" onClick={handleProfileMenuClose}><Link to="/login">Log in</Link></MenuItem>,
      <MenuItem key="signup" onClick={handleProfileMenuClose}><Link to="/signup">Sign Up</Link></MenuItem>
    ]

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Logo />{menuSeparator}

        <Typography variant="h6" className="title">
          {currentPath === '/' ? "TimeMap" : "Presentation"}
        </Typography>{menuSeparator}

        {props.loggedInStatus ?
          <Aux><Typography variant="h6" className="title">Timesheet</Typography>{menuSeparator}</Aux> : null}

        <IconButton
          edge="end"
          aria-label="profile menu"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
          className="account_btn"
        >
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleProfileMenuClose}
        >
          {menuItems.map(item => item)}
        </Menu>

      </Toolbar>
    </AppBar>
  );
}

export default AppBarTM;
