import React from "react";
import styles from "../ReservationsPage.module.css";
const ScreeningRoomView = (props) => {
  const seatMap = props.seatMap;
  return (
    <div className={styles.screeningRoom}>
      <h2>Wybierz miejsca do zarezerwowania</h2>
      <div className={styles.screen}></div>
      {seatMap}
    </div>
  );
};

export default ScreeningRoomView;
