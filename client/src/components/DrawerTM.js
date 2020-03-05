import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
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
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
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
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    marginTop: "64px",
    width: "55px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
              <div className={classes.chapterTitle}>{chapter.txt}</div>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default DrawerTM;