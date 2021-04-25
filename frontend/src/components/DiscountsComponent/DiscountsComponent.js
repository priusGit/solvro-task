import React, { Component } from "react";
import styles from "./DiscountsComponent.module.css";
import * as actions from "../../store/actions/index";
// import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

class DiscountsComponent extends Component {
  state = {
    values: {
      student: 0,
      schoolkid: 0,
      senior: 0,
      plandemia: 0,
    },
    discountsSelected: 0,
  };

  form = {
    discountsNames: [
      "Studencka (-50%)",
      "Uczniowska (-25%)",
      "Dla Seniora (-34%)",
      "PLANdemia (+200%)",
    ],
  };
  inputChangedHandler = (type, index) => {
    const updatedValues = {
      ...this.state.values,
    };
    let newDiscountsSelectedValue = this.state.discountsSelected;
    if (type === "plus") {
      if (this.props.seatsPicked.length - this.state.discountsSelected !== 0) {
        updatedValues[Object.keys(updatedValues)[index]] += 1;
        newDiscountsSelectedValue++;
      }
    } else {
      if (this.state.values[Object.keys(updatedValues)[index]] !== 0) {
        updatedValues[Object.keys(updatedValues)[index]] -= 1;
        newDiscountsSelectedValue--;
      }
    }
    this.props.saveDiscounts(updatedValues);
    this.setState({
      values: updatedValues,
      discountsSelected: newDiscountsSelectedValue,
    });
  };
  //   reservationHandler = (event) => {
  //     event.preventDefault();
  //     this.props.saveFormData(this.state.values);
  //     this.props.history.push("/summary");
  //   };

  render() {
    const discounts = this.form.discountsNames.map((discName, index) => (
      <div key={discName} className={styles.discountElement}>
        <li key={discName}>{discName}</li>
        <div className={styles.grow} />
        <div className={styles.addDelete}>
          <button
            type="button"
            className={classNames(
              this.props.seatsPicked.length - this.state.discountsSelected === 0
                ? styles.disabled
                : null
            )}
            onClick={() => this.inputChangedHandler("plus", index)}
          >
            +
          </button>
          <p>{this.state.values[Object.keys(this.state.values)[index]]}</p>
          <button
            type="button"
            className={classNames(
              this.state.values[Object.keys(this.state.values)[index]] === 0
                ? styles.disabled
                : null
            )}
            onClick={() => this.inputChangedHandler("minus", index)}
          >
            -
          </button>
        </div>
      </div>
    ));
    return (
      <div
        className={styles.formComponent}
        style={this.props.display ? { display: "block" } : { display: "none" }}
      >
        <li className={styles.leftCounter}>
          Pozostało siedzeń bez zniżek:{" "}
          {this.props.seatsPicked.length - this.state.discountsSelected}
        </li>
        {discounts}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    seatsPicked: state.seatsPicked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDiscounts: (discounts) => dispatch(actions.saveDiscounts(discounts)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DiscountsComponent));
