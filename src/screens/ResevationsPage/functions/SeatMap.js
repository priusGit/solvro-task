import React from "react";
import styles from "../ReservationsPage.module.css";
import Seat from "../../../components/Seat/Seat";
const SeatMap = (props) => {
  const row = props.row;
  const seats = props.seats;
  return (
    <ul className={styles.seatRow} key={row}>
      <li className={styles.rowName}>{row}</li>
      {seats[row].map((seat, index) => (
        <Seat
          key={index}
          status={Object.values(seat)[0]}
          row={row}
          number={index + 1}
        />
      ))}
    </ul>
  );
};

export default SeatMap;
