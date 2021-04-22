import React, { Component } from "react";
import styles from "./Summary.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Auxi from "../../hoc/Auxi";
class Summary extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  state = {
    changeForm: false,
    reservationForm: {
      name: {
        elementConfig: {
          type: "text",
          placeholder: "Imię",
        },
        value: "",
        validation: {
          required: true,
        },
        pattern: "\\p{L}+",
      },
      surName: {
        elementConfig: {
          type: "text",
          placeholder: "Nazwisko",
        },
        value: "",
        validation: {
          required: true,
        },
        pattern: "\\p{L}+",
      },
      phoneNumber: {
        elementConfig: {
          type: "tel",
          placeholder: "Numer Telefonu",
        },
        value: "",
        validation: {
          required: true,
        },
        pattern: "[0-9]{8,14}",
      },
      email: {
        elementConfig: {
          type: "email",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
      },
      discounts: {
        elementConfig: {
          type: "list",
          placeholder: "Zniżki:",
        },
        value: "",
        validation: {
          required: false,
        },
      },
    },
    discountsNames: [
      "Studencka (-50%)",
      "Uczniowska (-25%)",
      "Dla Seniora (-34%)",
      "PLANdemia (+200%)",
    ],
    discShowing: false,
  };

  showInputs = () => {
    this.setState({ changeForm: !this.state.changeForm });
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
    this.showInputs();
    this.props.saveFormPart(this.state.reservationForm);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.reservationForm) {
      formElementsArray.push({
        id: key,
        config: this.state.reservationForm[key],
      });
    }
    let form;
    if (this.props.userData) {
      form = (
        <form
          className={styles.form}
          onSubmit={(event) => this.reservationHandler(event)}
        >
          {this.state.changeForm ? (
            <button type="submit" className={styles.save}>
              Zapisz
            </button>
          ) : (
            <button type="submit">Edytuj</button>
          )}
          <div>
            <p>Imię i nazwisko: </p>
            {this.state.changeForm ? (
              <Auxi>
                <input
                  key="name"
                  type="text"
                  pattern="[a-zA-Z]+"
                  placeholder={this.props.userData.name}
                  onChange={(event) =>
                    this.inputChangedHandler("text", event, "name")
                  }
                />
                <input
                  key="surname"
                  type="text"
                  placeholder={this.props.userData.surName}
                  pattern="[a-zA-Z]+"
                  onChange={(event) =>
                    this.inputChangedHandler("text", event, "surName")
                  }
                />
              </Auxi>
            ) : (
              <p>
                {this.props.userData.name + " " + this.props.userData.surName}
              </p>
            )}
          </div>
          <div>
            <p>Numer telefonu: </p>
            {this.state.changeForm ? (
              <input
                key="number"
                type="text"
                pattern="[0-9]{8,14}"
                placeholder={this.props.userData.phoneNumber}
                onChange={(event) =>
                  this.inputChangedHandler("text", event, "phoneNumber")
                }
              />
            ) : (
              <p>{this.props.userData.phoneNumber}</p>
            )}
          </div>
          <div>
            <p>E-mail: </p>
            {this.state.changeForm ? (
              <input
                key="email"
                type="email"
                placeholder={this.props.userData.email}
                onChange={(event) =>
                  this.inputChangedHandler("text", event, "email")
                }
              />
            ) : (
              <p>{this.props.userData.email}</p>
            )}
          </div>
          <div>
            <p>Zniżka: </p>
            <p>{this.props.userData.discounts}</p>
            <div />
          </div>
          <ul>
            <li>Wybrane miejsca:</li>
            {this.props.seatsPicked.map((seatMini, index) => (
              <li key={index}>{seatMini.seatRow + seatMini.seatNum}</li>
            ))}
          </ul>
        </form>
      );
    }
    return (
      <section className={styles.summary}>
        <h1>Podsumowanie</h1>
        {form}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.formData,
    seatsPicked: state.seatsPicked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveFormPart: (data) => dispatch(actions.saveFormPart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
