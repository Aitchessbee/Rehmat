import { useState } from "react";
import axios from "axios"

import Styles from "./Style/RefSignup.module.css";
import * as React from "react";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";
import wave from "./image/wave.png";


function RefSignup() {
  const [refCard, setRefCard] = useState();

  const onImageSelect = (e) => {
    if (e.target.files[0].size > 10000000) {
      alert("File size should be below 10MB!")
      setRefCard()
    } else {
        setRefCard(e.target.files[0])
    }
  }

  // const onSubmit = async (e) => (
  //   if(refCard) {
  //     await axios.get("")
  //   }
  // )

  return (
    <div className={Styles.container}>
      <div style={{ zIndex: "0", position: "fixed", width: "100vw", top: "0" }}>
        <img className={Styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <div style={{ zIndex: "2" }}>
        {" "}
        <h1 style={{ fontSize: "3em" }}>UPLOAD YOUR REFUGEE CARD HERE </h1>
        <Stack style={{justifyContent:"center"}} direction="row" alignItems="center" spacing={2}>
            <input accept="image/*" multiple type="file" className={Styles.uploadButton} onChange={onImageSelect} />
            <FileUploadIcon />
        </Stack>
      </div>

      <button className={Styles.submitButton}>Submit</button>
    </div>
  );
}

export default RefSignup;
