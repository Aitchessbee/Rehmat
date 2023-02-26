import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Calendar from "react-calendar";
import styles from "./Styles/refugeeSlot.module.css";
import "react-calendar/dist/Calendar.css";
import Button from "./components/Button";
import left_triangle from "./images/left_triangle.png";
import wave from "./images/wave.png";
import avatar from "./images/avatar.png";

function RefugeeSlot() {
  const [timeSlots, setTimeSlots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("rehmat-token");

    if(!token) {
        navigate("/refugee-signup")
    }
  }, []);

  useEffect(() => {
    console.log(timeSlots);
  }, [timeSlots]);

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
      <h1 className={styles.heading}>BOOK AN APPOINTMENT</h1>
      <div className={styles.columns}>
        <div className={styles.calendarDiv}>
          <Calendar />
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
              <Link to={"#"}>
                <button className={styles.vidBtn}>Start Video Call -> </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <img
        style={{ height: " 22vh", position: "absolute", bottom: " 0%" }}
        src={left_triangle}
        alt="left triangle png"
      ></img>
    </div>
  );
}

export default RefugeeSlot;
