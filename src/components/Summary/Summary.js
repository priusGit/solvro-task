import React, { Component } from 'react';
import './Summary.css';
// import classNames from 'classnames';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
// import Auxi from '../../hoc/Auxi'
// import { NavLink } from 'react-router-dom';
class Summary extends Component {
    componentDidMount() {
            window.scrollTo(0, 0);
    }
    state = {
        activeHour:false
    }

    inputChangedHandler = (elementType, event, inputIdentifier) => {
        const updatedreservationForm = {
            ...this.state.reservationForm
        };
        const updatedFormElement = {
            ...updatedreservationForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedreservationForm[inputIdentifier] = updatedFormElement;
        this.setState({ reservationForm: updatedreservationForm});
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.reservationForm) {
            formElementsArray.push({
                id: key,
                config: this.state.reservationForm[key]
            });
        }
        let form = (
            <form className="form">
                <div><p>Imię i nazwisko: {this.props.userData.name} {this.props.userData.surName}</p><div></div><button>Edytuj</button></div>
               <div> <p>Numer telefonu: {this.props.userData.phoneNumber}</p><div></div><div></div><button>Edytuj</button></div>
                <div><p>E-Mail: {this.props.userData.email}</p><div></div><button>Edytuj</button></div>
                <div><p>Zniżka: {this.props.userData.discounts}</p><div></div><button>Edytuj</button></div>
                <ul>
                            <li>Wybrane miejsca:</li>
                            {this.props.seatsPicked.map((seatMini,index) => (
                                <li key={index}>{seatMini.seatRow+seatMini.seatNum}</li>
                            ))}
                        </ul>
            </form>)
        return (
            <section className="summary">
                <h1>Podsumowanie</h1>
                {form}
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        userData: state.formData,
        seatsPicked: state.seatsPicked
    };
};

export default connect(mapStateToProps, null)(Summary);