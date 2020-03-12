import React  from 'react';
import Aux from '../hoc/Aux';
import Logo from '../components/Logo';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem }from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';


const menuSeparator = <pre>  |  </pre>;

const AppBarTM = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'profile-menu';

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = loggedIn ? [
      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>,
      <MenuItem onClick={handleProfileMenuClose}>Something else</MenuItem>
    ] :
    [
      <MenuItem onClick={handleProfileMenuClose}>Log in</MenuItem>,
      <MenuItem onClick={handleProfileMenuClose}>Sign Up</MenuItem>
    ]

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Logo />{menuSeparator}

        <Typography variant="h6" className="title">
          {currentPath === '/' ? "TimeMap" : "Presentation"}
        </Typography>{menuSeparator}

        {loggedIn ?
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
