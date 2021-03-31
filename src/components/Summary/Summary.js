import React, { Component } from 'react';
import './Summary.css';
import { connect } from 'react-redux';
import Auxi from '../../hoc/Auxi'
class Summary extends Component {
    componentDidMount() {
            window.scrollTo(0, 0);
    }
    state = {
        activeHour:false,
        changeName:false,
        changeNum:false,
        changeEmail:false,
        changeDisc:false,
        reservationForm: {
            name: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Imię'
                },
                value: '',
                validation: {
                    required: true
                },
                pattern:"[a-zA-Z]+"
            },
            surName: {
               
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nazwisko'
                },
                value: '',
                validation: {
                    required: true
                },
                pattern:"[a-zA-Z]+"
            },
            phoneNumber: {
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Numer Telefonu'
                },
                value: '',
                validation: {
                    required: true
                }
            },
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true
                }
            },
            discounts: {
                elementConfig: {
                    type:"list",
                    placeholder: 'Zniżki:'
                },
                value: '',
                validation: {
                    required: false
                }
            }
        },
        discountsNames:["Studencka (-50%)","Uczniowska (-25%)","Dla Seniora (-34%)","PLANdemia (+200%)"],
        discShowing:false
    }

    showDiscounts = (e,name) => {
        switch(name){
            case "name":{
                this.setState({changeName:!this.state.changeName});
                break;
            }
            case "number":{
                this.setState({changeNum:!this.state.changeNum});break;
            }
            case "email":{
                this.setState({changeEmail:!this.state.changeEmail});break;
            }
            case "discount":{
                this.setState({changeDisc:!this.state.changeDisc});break;
            }
            default:{
                break;
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
        let form;
        if(this.props.userData){
            form = (
                <form className="form">
                    <div>
                    {this.state.changeName?<button  type="button" className="save"onClick={(e) => this.showDiscounts(e,"name")}>Zapisz</button>:<button type="button" onClick={(e) => this.showDiscounts(e,"name")}>Edytuj</button>}
                        <p>Imię i nazwisko: </p>
                        {this.state.changeName?<Auxi>
                            <input key="name" type="text" placeholder="Imię" required  onChange={(event) => this.inputChangedHandler("text", event, "name")}/><input key="surname" type="text" placeholder="Nazwisko" required onChange={(event) => this.inputChangedHandler("text", event, "surname")}/></Auxi>:<p>{this.props.userData.name +" "+this.props.userData.surName}</p>}
                    </div>
                    <div>
                    {this.state.changeNum?<button type="button" className="save"  onClick={(e) => this.showDiscounts(e,"number")}>Zapisz</button>:<button type="button" onClick={(e) => this.showDiscounts(e,"number")}>Edytuj</button>}
                    <p>Numer telefonu: </p>
                        {this.state.changeNum?<input key="number" type="text" placeholder="Numer telefonu" required onChange={(event) => this.inputChangedHandler("text", event, "phoneNumber")}/>:<p>{this.props.userData.phoneNumber}</p>}
                    </div>
                    <div>
                    {this.state.changeEmail?<button type="button" className="save" onClick={(e) => this.showDiscounts(e,"email")}>Zapisz</button>:<button type="button" onClick={(e) => this.showDiscounts(e,"email")}>Edytuj</button>}
                    <p>E-mail: </p>
                        {this.state.changeEmail?<input key="email" type="text" placeholder="E-mail" required onChange={(event) => this.inputChangedHandler("text", event, "email")}/>:<p>{this.props.userData.email}</p>}
                    </div>
                    <div>
                    <button type="button">Edytuj</button><p>Zniżka: </p><p>{this.props.userData.discounts}</p><div></div>
                    </div>
                    <ul>
                                <li>Wybrane miejsca:</li>
                                {this.props.seatsPicked.map((seatMini,index) => (
                                    <li key={index}>{seatMini.seatRow+seatMini.seatNum}</li>
                                ))}
                            </ul>
                </form>)
        }
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