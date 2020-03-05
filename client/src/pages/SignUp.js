import React  from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const projects = [
  {
    value: "retex",
    label: "Retex"
  },
  {
    value: "spectar",
    label: "SpectAR"
  },
  {
    value: "martin-bros",
    label: "Martin Brothers"
  }
];

const positions = [
  {
    value: "dev",
    label: "Developer"
  },
  {
    value: "qa",
    label: "Quality Assurance"
  },
  {
    value: "pm",
    label: "Project Manager"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: 200
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });
  const [project, setProject] = React.useState("");
  const [position, setPosition] = React.useState("");

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleProjectChange = event => {
    setProject(event.target.value);
  };

  const handlePositionChange = event => {
    setPosition(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="first-name"
          label="First Name"
          variant="outlined"
        />
        <TextField
          required
          id="last-name"
          label="Last Name"
          variant="outlined"
        />
      </div>

      <div>
        <TextField
          required
          type="email"
          id="email"
          label="E-Mail"
          variant="outlined"
        />
      </div>
      <div>
        <FormControl
          required
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </div>

      <div className={classes.root}>
        <div>
          <TextField
            id="select-project"
            select
            label="Select"
            value={project}
            onChange={handleProjectChange}
            helperText="Please select project"
            variant="outlined"
          >
            {projects.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="select-position"
            select
            label="Select"
            value={position}
            onChange={handlePositionChange}
            helperText="Please select your position"
            variant="outlined"
          >
            {positions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
