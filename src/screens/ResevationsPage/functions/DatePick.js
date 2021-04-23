import React from "react";
import classNames from "classnames";
import styles from "../ReservationsPage.module.css";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const DatePick = (props) => {
  const date = new Date(props.dateElement);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const finalText = hour + ":" + minutes;
  return (
    <li
      className={classNames(
        styles.datePick,
        props.activeHour === props.dateElement ? styles.selectedHour : ""
      )}
      onClick={() => props.setActiveHour(props.dateElement)}
    >
      {finalText}
    </li>
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
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovieData: (movieID) => dispatch(actions.fetchMovie(movieID)),
    setActiveHour: (activeHour) => dispatch(actions.setActiveHour(activeHour)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePick);
