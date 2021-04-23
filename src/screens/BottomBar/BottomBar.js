import React from "react";
import styles from "./BottomBar.module.css";
import { connect } from "react-redux";

const BottomBar = (props) => {
  return (
    <div className={styles.bottomBar}>
      <ul>
        <li>Wybrane miejsca:</li>
        {props.seatsPicked.map((seatMini, index) => (
          <li key={index}>{seatMini.seatRow + seatMini.seatNum}</li>
        ))}
      </ul>
      <div />
      <button className={styles.toForm} onClick={props.formShowFunction}>
        Dalej
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.title,
    sessions: state.sessions,
    arrangement: state.arrangement,
    activeHour: state.activeHour,
    seatsPicked: state.seatsPicked,
  };
};

export default connect(mapStateToProps, null)(BottomBar);
