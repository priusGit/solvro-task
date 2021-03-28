import React, { Component } from 'react';
import './FormComponent.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Auxi from '../../hoc/Auxi'
class FormComponent extends Component {
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
                    type: 'tel',
                    placeholder: 'Numer Telefonu'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            email: {
                label: "E-mail: *",
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            discounts: {
                label: "Wybierz zniżkę:",
                elementType: 'input',
                elementConfig: {
                    type:"list",
                    placeholder: 'Zniżki:'
                },
                value: '',
                validation: {
                    required: false
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
    render() {
        const formElementsArray = [];
        for (let key in this.state.reservationForm) {
            formElementsArray.push({
                id: key,
                config: this.state.reservationForm[key]
            });
        }
        ///zrobić to normalnie, bez tej listy, z mapowaniem i generowaniem jakichś divów czy li czy coś
        let form = (
            <form className="form">
                {formElementsArray.map((formElement,index) => (
                    <div key={index}>
                    <label>{formElement.config.label}</label>
                    {formElement.config.elementConfig.type==="list"?
                    <Auxi>
                        <input key={formElement.id} placeholder={formElement.config.elementConfig.placeholder} value={formElement.config.value} id={formElement.config.label} required={formElement.config.validation.required} onChange={(event) => this.inputChangedHandler(formElement.config.elementType, event, formElement.id)} list="listOfDiscounts"></input>
                        <datalist id="listOfDiscounts">
                    <option value="Edge"/>
                    <option value="Firefox"/>
                    <option value="Chrome"/>
                    <option value="Opera"/>
                    <option value="Safari"/>
                    </datalist>
                    </Auxi>
                    :
                    <input key={formElement.id} type={formElement.config.elementConfig.type} placeholder={formElement.config.elementConfig.placeholder} value={formElement.config.value} id={formElement.config.label} required={formElement.config.validation.required} onChange={(event) => this.inputChangedHandler(formElement.config.elementType, event, formElement.id)}></input>}
                    </div>
                ))}
                <NavLink className="formButton" onClick={() => this.props.saveFormData(this.state.reservationForm)} exact to="/summary">ZAREZERWUJ!</NavLink>
            </form>
        );
        return (
            <section className="formComponent">
                <h1>Podaj dane do biletu</h1>
                {form}
            </section>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        saveFormData: (data) => dispatch(actions.saveFormData(data))
    };
};

export default connect(null, mapDispatchToProps)(FormComponent);