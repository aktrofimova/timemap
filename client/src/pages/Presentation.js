import React from 'react';
import { makeStyles} from "@material-ui/core/styles";
import DrawerTM from '../components/DrawerTM';


const Presentation = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.presentation}>
      TEST <b>PRESENTATION</b> COMPONENT

      <DrawerTM />



      <p style={{marginBottom: '500px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>

      <p style={{marginBottom: '500px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>

      <p style={{marginBottom: '500px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur eaque expedita facilis fugiat impedit in laboriosam magnam modi, nemo nostrum odit omnis placeat porro repellat repudiandae sunt tenetur unde veniam.</p>

    </div>)
};

const useStyles = makeStyles(() => ({
  presentation: {
    marginLeft: "55px"
  }
}));

export default Presentation;
