import Styles from "./Style/RefSignup.module.css";
import * as React from "react";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";
import wave from "./image/wave.png";

function RefSignup() {
  return (
    <div className={Styles.container}>
      <div style={{ zIndex: "0", position: "fixed", width: "100vw", top: "0" }}>
        <img className={Styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <div style={{ zIndex: "2" }}>
        {" "}
        <h1 style={{ fontSize: "3em" }}>UPLOAD YOUR REFUGEE CARD HERE </h1>
        <Stack style={{justifyContent:"center"}} direction="row" alignItems="center" spacing={2}>
          <Button className={Styles.btn1} variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
            <FileUploadIcon />
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default RefSignup;
