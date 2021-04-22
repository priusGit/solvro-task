import React, { Component } from "react";
import styles from "./FormComponent.module.css";
import * as actions from "../../store/actions/index";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Auxi from "../../hoc/Auxi";
class FormComponent extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  state = {
    reservationForm: {
      name: {
        label: "Imię: *",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Imię",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        pattern: "\\p{L}+",
      },
      surName: {
        label: "Nazwisko: *",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nazwisko",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        pattern: "\\p{L}+",
      },
      phoneNumber: {
        label: "Numer telefonu: *",
        elementType: "input",
        elementConfig: {
          type: "tel",
          placeholder: "Numer Telefonu",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
        touched: false,
        pattern: "[0-9]{8,14}",
      },
      email: {
        label: "E-mail: *",
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      discounts: {
        label: "Wybierz zniżkę:",
        elementType: "input",
        elementConfig: {
          type: "list",
          placeholder: "Zniżki:",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
      },
    },
    activeHour: false,
    discountsNames: [
      "Studencka (-50%)",
      "Uczniowska (-25%)",
      "Dla Seniora (-34%)",
      "PLANdemia (+200%)",
    ],
    discShowing: false,
  };

  showDiscounts = (e) => {
    this.setState({ discShowing: !this.state.discShowing });
  };
  setPickedDiscount = (discName) => {
    const updatedreservationForm = {
      ...this.state.reservationForm,
    };
    const updatedFormElement = {
      ...updatedreservationForm.discounts,
    };
    updatedFormElement.value = discName;
    updatedreservationForm.discounts = updatedFormElement;
    this.setState({ reservationForm: updatedreservationForm });
  };
  inputChangedHandler = (elementType, event, inputIdentifier) => {
    const updatedreservationForm = {
      ...this.state.reservationForm,
    };
    const updatedFormElement = {
      ...updatedreservationForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedreservationForm[inputIdentifier] = updatedFormElement;
    this.setState({ reservationForm: updatedreservationForm });
  };
  reservationHandler = (event) => {
    event.preventDefault();
    this.props.saveFormData(this.state.reservationForm);
    this.props.history.push("/summary");
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.reservationForm) {
      formElementsArray.push({
        id: key,
        config: this.state.reservationForm[key],
      });
    }
    const discounts = this.state.discountsNames.map((discName) => (
      <li
        onClick={(e) => {
          this.setPickedDiscount(discName);
          this.showDiscounts(e);
        }}
        className={classNames(
          styles.discount,
          this.state.reservationForm.discounts.value === discName
            ? styles.selectedDisc
            : ""
        )}
        key={discName}
      >
        {discName}
      </li>
    ));
    const form = (
      <form className={styles.form} onSubmit={this.reservationHandler}>
        {formElementsArray.map((formElement, index) => (
          <div key={index}>
            {formElement.config.elementConfig.type === "list" ? (
              <Auxi>
                <label
                  className={styles.labelDisc}
                  onClick={(e) => this.showDiscounts(e)}
                >
                  {formElement.config.label}
                </label>
                <button
                  type="button"
                  onClick={(e) => this.showDiscounts(e)}
                  className={classNames(
                    styles.triangle,
                    this.state.discShowing ? styles.activeTriangle : ""
                  )}
                >
                  ▶
                </button>
                <ul className={styles.ulDiscounts}>
                  {this.state.discShowing ? discounts : null}
                </ul>
              </Auxi>
            ) : (
              <Auxi>
                <label>{formElement.config.label}</label>
                <input
                  key={formElement.id}
                  type={formElement.config.elementConfig.type}
                  placeholder={formElement.config.elementConfig.placeholder}
                  value={formElement.config.value}
                  id={formElement.config.label}
                  required={formElement.config.validation.required}
                  onChange={(event) =>
                    this.inputChangedHandler(
                      formElement.config.elementType,
                      event,
                      formElement.id
                    )
                  }
                  pattern={
                    formElement.config.pattern
                      ? formElement.config.pattern
                      : null
                  }
                ></input>
              </Auxi>
            )}
          </div>
        ))}
        <button type="submit" className={styles.formButton}>
          ZAREZERWUJ
        </button>
      </form>
    );
    return (
      <section className={styles.formComponent}>
        <h1>Podaj dane do biletu</h1>
        {form}
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveFormData: (data) => dispatch(actions.saveFormData(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(FormComponent));
