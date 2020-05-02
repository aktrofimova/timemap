import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/Footer";


const Home = (props) => {
  const classes = useStyles();

  let linkLabel = props.loggedInStatus ? 'Go To Task Tracker' : 'Start Tracking Your Time';
  let path = props.loggedInStatus ? '/profile/:id/tasks' : '/login';

  return (
    <div className={classes.home}>

      <section className="home_section">
        <h1 className="header home_header">TimeMap</h1>
        <p className="home_sub_header">Mange your time and bla bla bla</p>
        <Link className="cta_btn primary" to={path}>{linkLabel}</Link>
      </section>

      <section className="home_section">
        <h4>Some marketing text</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>
      </section>

      <section className="home_section">
        <h4>Some features</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>
      </section>

      <section className="home_section">
        <h4>Technologies used</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>
      </section>


      <Footer />

    </div>)
};

const useStyles = makeStyles(() => ({
  home: {
    // marginLeft: "55px"
  }
}));

export default Home;
