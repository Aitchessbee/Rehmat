import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Styles from "./Style/Login.module.css";
import wave from "./image/wave.png";

const Login = () => {
  return (
    <>
      <div>
        <img className={Styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <div className={Styles.loginCard}>
        <h2>Log In</h2>
        <div className={Styles.textfield}>
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="Email"
            variant="standard"
          />
          <TextField
            className={Styles.field}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <Button variant="contained" href="#contained-buttons">
            Log In
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
