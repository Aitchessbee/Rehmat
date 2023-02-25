import Styles from "./Style/DocSignup.module.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";

const SubmitHandler = (event) => {
  event.preventDefault();
};

const DocSignup = () => {
  return (
    <>
      <div className="spacer"></div>
      <form onSubmit={SubmitHandler}>
        <div className={Styles.container1}>
          {" "}
          <h2>Sign Up</h2>
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="First Name"
            variant="standard"
          />
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="Last Name"
            variant="standard"
          />
          <TextField
            className={Styles.field}
            id="standard-basic"
            label="Email"
            variant="standard"
          />
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <TextField
            className={Styles.field}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <TextField
            className={Styles.field}
            id="standard-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />
          <Button variant="contained" href="#contained-buttons">
            Submit
          </Button>
        </div>
        <div className={Styles.V1}></div>
        <div className={Styles.container2}>
          {" "}
          <h2>Upload your Doctor Certification</h2>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              className={Styles.btn1}
              variant="contained"
              component="label"
            >
              Upload
              <input hidden accept="image/*" multiple type="file" />
              <FileUploadIcon />
            </Button>
          </Stack>
        </div>
      </form>
    </>
  );
};

export default DocSignup;
