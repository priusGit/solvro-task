import React, { Component } from "react";
import styles from "./Summary.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Auxi from "../../hoc/Auxi";
import DiscountsComponent from "../../components/DiscountsComponent/DiscountsComponent";
import classNames from "classnames";
class Summary extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  state = {
    changeForm: false,
    values: {
      name: "",
      surName: "",
      phoneNumber: "",
      email: "",
    },
    discShowing: false,
    discAmount: 0,
  };

  form = {
    reservationForm: {
      name: {
        elementConfig: {
          type: "text",
          placeholder: "Imię",
        },
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
        validation: {
          required: true,
        },
      },
    },
    discountsNames: [
      "Studencka (-50%)",
      "Uczniowska (-25%)",
      "Dla Seniora (-34%)",
      "PLANdemia (+200%)",
    ],
  };
  showInputs = () => {
    this.setState({ changeForm: !this.state.changeForm });
  };

  inputChangedHandler = (elementType, event, inputIdentifier) => {
    const updatedValues = {
      ...this.state.values,
    };
    updatedValues[inputIdentifier] = event.target.value;
    this.setState({ values: updatedValues });
  };
  reservationHandler = (event) => {
    event.preventDefault();
    this.showInputs();
    this.props.saveFormPart(this.state.values);
  };

  render() {
    let form;
    if (this.props.userData) {
      form = (
        <form
          className={classNames(
            styles.form,
            this.state.changeForm ? styles.editable : null
          )}
          onSubmit={(event) => this.reservationHandler(event)}
        >
          {this.state.changeForm ? (
            <button type="submit" className={styles.save}>
              Zapisz
            </button>
          ) : (
            <button type="submit" onClick={() => this.props.saveDiscounts()}>
              Edytuj
            </button>
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
          {this.state.changeForm ? (
            <DiscountsComponent display={true} />
          ) : (
            <Auxi>
              <div>
                <p>
                  Liczba biletów normalnych:{" "}
                  {this.props.seatsPicked.length - this.props.discAmount}
                </p>
              </div>
              <div>
                <p>Liczba biletów ulgowych: {this.props.discAmount}</p>
              </div>
              {this.props.discAmount > 0 ? (
                <Auxi>
                  <p>Wybrane zniżki:</p>
                  {Object.keys(this.props.discounts).map((keyName, i) => (
                    <p key={i}>
                      {this.form.discountsNames[i]}:{" "}
                      {this.props.discounts[keyName]}
                    </p>
                  ))}
                </Auxi>
              ) : null}
            </Auxi>
          )}

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
      <section
        className={classNames(
          styles.summary,
          this.state.changeForm ? styles.editSection : null
        )}
      >
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
    discounts: state.discounts,
    discAmount: state.discAmount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveFormPart: (data) => dispatch(actions.saveFormPart(data)),
    saveDiscounts: () => dispatch(actions.saveDiscounts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
