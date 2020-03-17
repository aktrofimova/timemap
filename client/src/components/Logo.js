import React  from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/"><img className={classes.logo_img} src={logo} alt="Time Map"/></Link>
    </div>
  );
};

export default Logo;
