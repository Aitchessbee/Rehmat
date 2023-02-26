import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Calendar from "react-calendar";
import styles from "./Styles/refugeeSlot.module.css";
import "react-calendar/dist/Calendar.css";
import Button from "./components/Button";

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
      <div className="spacer"></div>
      <h1 className={styles.heading}>BOOK AN APPOINTMENT</h1>
      <div className={styles.columns}>
        <div className={styles.calendarDiv}>
          <Calendar />
        </div>

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
        </div>
      </div>
    </div>
  );
}

export default RefugeeSlot;
