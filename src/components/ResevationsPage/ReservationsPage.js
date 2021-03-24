import React, { Component } from 'react';
import './ReservationsPage.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Auxi from '../../hoc/Auxi'
class ReservationsPage extends Component {
    componentDidMount() {
            //this.props.onFetchMovieData(78483421);
            window.scrollTo(0, 0);
    }
    state = {
        reservationForm: {
            name: {
                label: "Imię: *",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Imię'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            surName: {
                label: "Nazwisko: *",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nazwisko'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                label: "Numer telefonu: *",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Numer Telefonu'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        }
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
            <form className="form" onSubmit={this.reservationHandler}>
                {formElementsArray.map((formElement,index) => (
                    <div key={index}>
                    <label>{formElement.config.label}</label>
                    {console.log(formElement)}
                    <input key={formElement.id} type={formElement.config.elementConfig.elementType} value={formElement.config.value} id={formElement.config.label} required={formElement.config.validation.required} onChange={(event) => this.inputChangedHandler(formElement.config.elementType, event, formElement.id)}></input>
                    </div>
                ))}
                <button>ZAREZERWUJ!</button>
            </form>
        );

        let dates = this.props.sessions;
        let datePick = (
            dates.map((dateElement,index) => {
            let date = new Date(dateElement);
            let hour= date.getHours();
            let minutes= date.getMinutes();
            let finalText = hour+":"+minutes;
                return(
                    <li className="datePick" key={index}>{finalText}</li>
                )
            }
        ))
        let seats = this.props.arrangement;
        let seatMap = Object.keys(seats).map(row => (
            <ul className="seatRow" key={row}>
                {
                    seats[row].map((seat,index) => (
                        <li key={index} className="seat">{index+1}</li>
                        //seat[index+1] dla zajętości
                    ))
                    
                }
                
            </ul>
        ))

        return (
            <section className="reservationsPage">
                <h1>{this.props.title}</h1>
                <ul className="datePicker">{datePick}</ul>
                <div className="ScreeningRoom">{seatMap}</div>
                {form}
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        title: state.title,
        sessions: state.sessions,
        arrangement: state.arrangement
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMovieData: (movieID) => dispatch(actions.fetchMovie(movieID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage);