import React  from 'react';
import { makeStyles} from "@material-ui/core/styles";
import logo from '../logo-coloured.svg';

const useStyles = makeStyles(() => ({
  logo: {
    maxHeight: "64px"
  },

  logo_img: {
    maxHeight: "inherit",
    width: "45px"
  }
}));

const Logo = () => {
  const classes = useStyles();

  return (
    <div className={classes.logo}>
      <img className={classes.logo_img} src={logo} alt="Time Map"/>
    </div>
  );
};

export default Logo;
