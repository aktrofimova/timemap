import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles} from "@material-ui/core/styles";
import Aux from '../hoc/Aux';
import Logo from '../components/Logo';
import Home from '../pages/Home';
import { AppBar, Toolbar, IconButton, Menu, MenuItem }from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo from "../logo-coloured.svg";


const useStyles = makeStyles(() => ({
  app_bar: {
    backgroundColor: 'white',
    color: '#00293c',
    padding: '0 40px'
  },
  menu: {
    '& li': {
      padding: 0
    },
    '& a, span': {
      margin: 'auto',
      padding: '5px 25px'
    },
    '& a': {
      width: '100%',
      textAlign: 'center'
    }
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  // const [currentPath] = useState(window.location.pathname);
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
        props.handleLogout();
        // TM-27
        return (<Redirect to="/" />);
      })
      .catch(error => console.log(error))
  }

  // const currentUser = props.currentUser;
  // const project = currentUser.project.id;
  const menuItems = props.loggedInStatus ? [
      <MenuItem key="profile" onClick={handleProfileMenuClose}><Link to={"/profile/" + props.currentUser.id}>Profile</Link></MenuItem>,
      <MenuItem key="project" onClick={handleProfileMenuClose}><Link to={"/project/" + props.currentUser.project.id}>Project</Link></MenuItem>,
      <MenuItem key="logout" onClick={handleLogout}><Link to="/">Log out</Link></MenuItem>
    ] :
    [
      <MenuItem key="login" onClick={handleProfileMenuClose}><Link to="/login">Log in</Link></MenuItem>,
      <MenuItem key="signup" onClick={handleProfileMenuClose}><Link to="/signup">Sign Up</Link></MenuItem>
    ]


  return (
    <AppBar position="fixed" className={classes.app_bar}>
      <Toolbar className={classes.tool_bar}>
        <div className="tool_bar_left">
          <Logo />

          {props.loggedInStatus ?
            <Aux>
              <Link to={"/profile/" + props.currentUser.id + "/timesheet"} className="tool_bar_item tool_bar_link">Timesheet</Link>
              <Link to={"/profile/" + props.currentUser.id + "/timeoffs"} className="tool_bar_item tool_bar_link">Time Offs</Link>
            </Aux> :
            <Link to="/" className="tool_bar_item">TimeMap</Link>
          }
        </div>

        <div className="tool_bar_right">
          {props.loggedInStatus ?
            <Aux>
              <p className="tool_bar_item name">{props.currentUser.name}</p>

              <IconButton
                className="tool_bar_item account"
                edge="end"
                aria-label="profile menu"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: 28 }}/>
              </IconButton>

              <Menu
                className={classes.menu}
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
            </Aux> :

            <Aux>
              <Link to="/login" className="tool_bar_item tool_bar_link">Log In</Link>
              <Link to="/signup" className="tool_bar_item tool_bar_link">Sign Up</Link>
            </Aux>
          }
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
