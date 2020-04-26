import React  from 'react';
import { Link } from 'react-router-dom';
import { makeStyles} from "@material-ui/core/styles";
import logo from '../logo-coloured.svg';

const useStyles = makeStyles(() => ({

}));

const Logo = () => {
  const classes = useStyles();

  return (
    <div className="logo">
      <Link to="/"><img className="logo_img" src={logo} alt="TimeMap"/></Link>
    </div>
  );
};

export default Logo;
