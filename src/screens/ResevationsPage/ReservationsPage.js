import React, { Component } from "react";
import styles from "./ReservationsPage.module.css";
import classNames from "classnames";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import DatePick from "./functions/DatePick";
import SeatMap from "./functions/SeatMap";
import ScreeningRoomView from "./functions/ScreeningRoomView";
import BottomBar from "../BottomBar/BottomBar";
import PageOverlay from "./functions/PageOverlay";
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
        return <DatePick key={dateElement} dateElement={dateElement} />;
      });
      const seats = this.props.arrangement;
      const seatMap = Object.keys(seats).map((row) => (
        <SeatMap key={row} row={row} seats={seats} />
      ));
      if (this.state.pageOverlayStatus) {
        pageOverlay = (
          <PageOverlay formShowFunction={(event) => this.showForm(event)} />
        );
      }
      //conditional rendering logic
      if (this.props.activeHour != null) {
        screeningRoomView = <ScreeningRoomView seatMap={seatMap} />;
        if (this.props.seatsPicked.length !== 0) {
          bottomBar = (
            <BottomBar formShowFunction={(event) => this.showForm(event)} />
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
