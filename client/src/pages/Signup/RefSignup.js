import Styles from "./Style/RefSignup.module.css";
import * as React from "react";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";

function RefSignup() {
  return (
    <div className={Styles.container}>
      <h1 style={{ fontSize: "3em" }}>UPLOAD YOUR REFUGEE CARD HERE </h1>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button className={Styles.btn1} variant="contained" component="label">
          Upload
          <input hidden accept="image/*" multiple type="file" />
          <FileUploadIcon />
        </Button>
      </Stack>
    </div>
  );
}

export default RefSignup;
