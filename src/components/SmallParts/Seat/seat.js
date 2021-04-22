import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "./Seat.css";

class Seat extends Component {
  componentDidMount() {
    this.props.seatsPicked.map((pickedSeat) => {
      if (
        pickedSeat.seatRow === this.props.row &&
        pickedSeat.seatNum === this.props.number
      ) {
        this.setState({ active: true });
      }
      return pickedSeat;
    });
  }
  state = {
    active: false,
  };

  toggleSeat = (event) => {
    this.setState({ active: !this.state.active });
  };
  render() {
    if (this.props.status === 0) {
      return (
        <li
          className={classNames(
            "seat free",
            this.state.active ? "selectedSeat" : ""
          )}
          onClick={(event) => {
            this.toggleSeat(event);
            this.props.seatPicked(this.props.row, this.props.number);
          }}
        >
          {this.props.number}
        </li>
      );
    } else {
      return <li className="seat taken">{this.props.number}</li>;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    seatPicked: (seatRow, seatNumber) =>
      dispatch(actions.seatPicked(seatRow, seatNumber)),
  };
};
const mapStateToProps = (state) => {
  return {
    seatsPicked: state.seatsPicked,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Seat);
