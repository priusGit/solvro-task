import React, { Component } from 'react';
import './ReservationsPage.css';
import classNames from 'classnames';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Seat from '../SmallParts/Seat/seat'
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
        },
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

    // toggleHour = (dateValue) =>{
    //     let activeVar;
    //     if(this.state.active===dateValue){
    //         activeVar=false;
    //     }
    //     else{
    //         activeVar=dateValue;
    //     }
    //     this.setState({active: activeVar});
    // }

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
                    <li className={classNames(
                "datePick", 
                this.props.activeHour===dateElement ? "selectedHour" : "" 
              )}
              onClick={() => this.props.setActiveHour(dateElement)} key={dateElement}>{finalText}</li>
                )
            }
        ))
        let seats = this.props.arrangement;
        let seatMap = Object.keys(seats).map(row => (
            <ul className="seatRow" key={row}>
                <li className="rowName">{row}</li>
                {
                    seats[row].map((seat,index) => (
                        <Seat key={index} status={Object.values(seat)[0]} row={row} number={index+1}/>
                    ))
                    
                }
                
            </ul>
        ))
        //conditional rendering logic
        let content;
        if(this.props.activeHour!=null)
        {
            content=(
                <div className="screeningRoom">
                    <div className="screen"></div>    
                    {seatMap}
                </div>
            )
            if(this.props.seatsPicked.length!==0)
            {
                content=(
                    <Auxi>
                    <div className="screeningRoom">
                    <div className="screen"></div>    
                    {seatMap}
                    </div>
                    {form}
                    </Auxi>
                )
            }
        }
        
        return (
            <section className="reservationsPage">
                <h1>{this.props.title}</h1>
                <ul className="datePicker">{datePick}</ul>
                {content}
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        title: state.title,
        sessions: state.sessions,
        arrangement: state.arrangement,
        activeHour: state.activeHour,
        seatsPicked: state.seatsPicked
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMovieData: (movieID) => dispatch(actions.fetchMovie(movieID)),
        setActiveHour: (activeHour) => dispatch(actions.setActiveHour(activeHour))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsPage);