import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, Divider, IconButton, ListItem } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StorageIcon from '@material-ui/icons/Storage';
import WebIcon from '@material-ui/icons/Web';
import StyleIcon from '@material-ui/icons/Style';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import StopIcon from '@material-ui/icons/Stop';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    marginTop: "64px",
    width: drawerWidth,
  },
  drawerClose: {
    marginTop: "64px",
    width: "55px",
    overflowX: "hidden",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  iconButton: {
    borderRadius: 0,
    padding: "12px 16px"
  },

  iconButtonClose: {
    marginLeft: "auto"
  },

  chapterIcon: {
    marginRight: "16px"
  }

}));

const DrawerTM = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const chapters = [
    {txt: "Intro", icon: <PlayArrowIcon />},
    {txt: "Back End", icon: <StorageIcon />},
    {txt: "Front End", icon: <WebIcon />},
    {txt: "Styling", icon: <StyleIcon />},
    {txt: "Deploy", icon: <FilterDramaIcon />},
    {txt: "Summary", icon: <StopIcon />}];

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.iconButton, {[classes.hide]: open})}
          >
            <ChevronRightIcon />
          </IconButton>
          <IconButton
            aria-label="close drawer"
            onClick={handleDrawerClose}
            className={clsx(classes.iconButton, classes.iconButtonClose, {[classes.hide]: !open})}>
            <ChevronLeftIcon />
          </IconButton>
        <Divider />
        <List>
          {chapters.map((chapter) => (
            <ListItem button key={chapter.txt}>
              <div className={classes.chapterIcon}>{chapter.icon}</div>
              <div>{chapter.txt}</div>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default DrawerTM;