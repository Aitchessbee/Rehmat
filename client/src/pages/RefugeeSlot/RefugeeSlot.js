import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Calendar from "react-calendar";
import styles from "./Styles/refugeeSlot.module.css";
import "react-calendar/dist/Calendar.css";
import Button from "./components/Button";
import left_triangle from "./images/left_triangle.png";
import wave from "./images/wave.png";
import { api_url } from "../../config";

// import { Button } from "@mui/material";

import axios from "axios";

import avatar from "./images/avatar.png";

function RefugeeSlot() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [value, onChange] = useState(new Date());

  const submitHandler = () => {
    alert("Slot Booked!")
  }

    const dateFormat = value.getFullYear() + "-" + (value.getMonth()+1) + "-" + value.getDate();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("rehmat-token");

    // if(!token) {
    //     navigate("/refugee-signup")
    // }
  }, []);

  useEffect(() => {
    console.log(timeSlots);
  }, [timeSlots]);



  useEffect(() => {
    const getSlots = async () => {
        const data = {
            "date": dateFormat,
        }
    
        const res = await axios.post(`${api_url}slot/available-slots/`, data)
    }
    
    getSlots();
    
  }, [dateFormat])


  const addValue = (value) => {
    setTimeSlots((prevTimeSlots) => [...prevTimeSlots, value]);
  };

  const removeValue = (value) => {
    const updatedSlots = timeSlots.filter((timeSlot) => timeSlot !== value);

    setTimeSlots(updatedSlots);
  };

  return (
    <div>
      <div style={{ position: "fixed", zIndex: "-1" }}>
        <img className={styles.bgimg} src={wave} alt="wave png image"></img>
      </div>
      <div className="spacer"></div>

      <h1 className={styles.heading}>CURRENT APPOINTMENTS</h1>
      {/* <div>You have no current appointments</div> */}
      <div className={styles.container}>
        <div className={styles.avatarDiv}>
          {" "}
          <img
            style={{ width: "7vw" }}
            src={avatar}
            alt="avatar image"
          ></img>
          <h3>DR. STEPHEN FLEMING CARDIOLOGIST</h3>
        </div>
        <div>
            <a href="https://rehmat-api.ccstiet.com/slot/call/1/1" className={styles.vidBtn} target="_blank">Start Video Call</a>
        </div>
      </div>

      <h1 className={styles.heading}>BOOK AN APPOINTMENT</h1>
      <div className={styles.columns}>
        <div className={styles.calendarDiv}>
          <Calendar onChange={onChange} value={value} />
        </div>
        <div>
          {" "}
          <div className={styles.slotsDiv}>
            <Button
              value="9:00"
              addValue={addValue}
              removeValue={removeValue}
              slotList={timeSlots}
            />
            <Button
              value="10:00"
              addValue={addValue}
              removeValue={removeValue}
              slotList={timeSlots}
            />
            <Button
              value="11:00"
              addValue={addValue}
              removeValue={removeValue}
              slotList={timeSlots}
            />
            <Button
              value="12:00"
              addValue={addValue}
              removeValue={removeValue}
              slotList={timeSlots}
            />
            <Button
              value="13:00"
              addValue={addValue}
              removeValue={removeValue}
              slotList={timeSlots}
            />
            <Button
              value="14:00"
              addValue={addValue}
              removeValue={removeValue}
              slotList={timeSlots}
            />
            <Button
              value="15:00"
              addValue={addValue}
              removeValue={removeValue}
              slotList={timeSlots}
            />
            <Button
              value="16:00"
              addValue={addValue}
              removeValue={removeValue}
              slotList={timeSlots}
            />
          </div>
          <a href="https://rehmat-api.ccstiet.com/slot/call/1/1" className={styles.vidBtn} target="_blank">Book Slot</a>

        </div>
      </div>

      {/* <Button variant="contained" onClick={submitHandler}>SUBMTI</Button> */}

      {/* <button style={{display: "block", margin: "50px auto", width: "150px", height: "40px", backgroundColor: "darkblue", color: "white"}} onClick={submitHandler}>SUBMIT</button> */}

      <img
        style={{ height: " 22vh", position: "fixed", bottom: " 0%" }}
        src={left_triangle}
        alt="left triangle png"
      ></img>
    </div>
  );
}

export default RefugeeSlot;
