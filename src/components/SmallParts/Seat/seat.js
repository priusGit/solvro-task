import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import './seat.css';

class Seat extends Component {
    componentDidMount(){
        this.props.seatsPicked.map((obj)=>{
            console.log(obj);
            console.log()
            if(obj.seatRow===this.props.row&&obj.seatNum===this.props.number){
                this.setState({active:true})
            }
            return obj;
        })
    }
    state = {
        active: false
     }
  
    toggleSeat = (e) =>{
        this.setState({active: !this.state.active});
     }
    render(){
        if(this.props.status === 0)
        {
            return(
            <li className={classNames(
                "seat free", 
                this.state.active ? "selectedSeat" : "" 
              )}
              onClick={e => {this.toggleSeat(e);this.props.seatPicked(this.props.row,this.props.number)}}>{this.props.number}</li>
            )
        }
        else{
            return ( <li className="seat taken">{this.props.number}</li>
                );
           
        }
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        seatPicked: (seatRow,seatNum) => dispatch(actions.seatPicked(seatRow,seatNum))
    };
};
const mapStateToProps = state => {
    return {
        seatsPicked: state.seatsPicked
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Seat);