import React, { Component } from "react";
import styles from "./ReservationsPage.module.css";
import classNames from "classnames";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Seat from "../SmallParts/Seat/Seat";
import FormComponent from "../FormComponent/FormComponent";
class ReservationsPage extends Component {
  componentDidMount() {
    this.props.onFetchMovieData("78483421");
    window.scrollTo(0, 0);
  }
  state = {
    activeHour: false,
    pageOverlayStatus: false,
  };
  showForm = (event) => {
    this.setState({ pageOverlayStatus: !this.state.pageOverlayStatus });
  };
  render() {
    let datePick, screeningRoomView, bottomBar, pageOverlay;
    if (this.props.title) {
      const dates = this.props.sessions;
      datePick = dates.map((dateElement, index) => {
        const date = new Date(dateElement);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const finalText = hour + ":" + minutes;
        return (
          <li
            className={classNames(
              styles.datePick,
              this.props.activeHour === dateElement ? styles.selectedHour : ""
            )}
            onClick={() => this.props.setActiveHour(dateElement)}
            key={dateElement}
          >
            {finalText}
          </li>
        );
      });
      const seats = this.props.arrangement;
      const seatMap = Object.keys(seats).map((row) => (
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
      ));
      if (this.state.pageOverlayStatus) {
        pageOverlay = (
          <div className={styles.pageOverlay}>
            <svg
              onClick={(event) => this.showForm(event)}
              className={styles.xSign}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
            <FormComponent />
          </div>
        );
      }
      //conditional rendering logic

      if (this.props.activeHour != null) {
        screeningRoomView = (
          <div className={styles.screeningRoom}>
            <h2>Wybierz miejsca do zarezerwowania</h2>
            <div className={styles.screen}></div>
            {seatMap}
          </div>
        );
        if (this.props.seatsPicked.length !== 0) {
          bottomBar = (
            <div className={styles.bottomBar}>
              <ul>
                <li>Wybrane miejsca:</li>
                {this.props.seatsPicked.map((seatMini, index) => (
                  <li key={index}>{seatMini.seatRow + seatMini.seatNum}</li>
                ))}
              </ul>
              <div />
              <button
                className={styles.toForm}
                onClick={(e) => this.showForm(e)}
              >
                Dalej
              </button>
            </div>
          );
        }
      }
    }
    return (
      <section className={styles.reservationsPage}>
        <div
          className={classNames(
            this.state.pageOverlayStatus ? styles.blurry : ""
          )}
        >
          <h1>{this.props.title}</h1>
          <ul className={styles.datePicker}>{datePick}</ul>
          {screeningRoomView}
          {bottomBar}
        </div>
        {pageOverlay}
      </section>
    );
  }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage);
