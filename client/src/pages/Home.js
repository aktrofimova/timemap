import React from 'react';
import { makeStyles} from "@material-ui/core/styles";


const Home = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <h1>TimeMap</h1>
      <h3>Mange your time and bla bla bla</h3>


      <h4>Some marketing text</h4>
      <p style={{marginBottom: '500px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>

      <h4>Some possibilities of the platform</h4>
      <p style={{marginBottom: '500px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>

      <h4>Sth else</h4>
      <p style={{marginBottom: '500px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>

    </div>)
};

const useStyles = makeStyles(() => ({
  home: {
    // marginLeft: "55px"
  }
}));

export default Home;
