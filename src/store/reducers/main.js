import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    title: 'Wojownicy Solvro, Więzień KNSI',
    sessions: [1561372200000, 1561379400000, 1561386600000, 1561390200000],
    arrangement: {
        'A': [{'1': 1}, {'2': 0}, {'3': 1}, {'4': 1}, {'5': 1}, {'6': 0}, {'7': 1}],
        'B': [{'1': 1}, {'2': 1}, {'3': 0}, {'4': 1}, {'5': 1}, {'6': 1}, {'7': 1}, {'8': 1}],
        'C': [{'1': 1}, {'2': 0}, {'3': 0}, {'4': 1}, {'5': 0}, {'6': 0}, {'7': 0}, {'8': 1}, {'9': 0}],
        'D': [{'1': 0}, {'2': 0}, {'3': 1}, {'4': 0}, {'5': 1}, {'6': 0}, {'7': 0}, {'8': 1}, {'9': 0}],
        'E': [{'1': 1}, {'2': 1}, {'3': 1}, {'4': 0}, {'5': 0}, {'6': 1}, {'7': 1}, {'8': 1}, {'9': 0}],
        'F': [{'1': 0}, {'2': 0}, {'3': 0}, {'4': 0}, {'5': 1}, {'6': 0}, {'7': 1}, {'8': 0}, {'9': 0}],
        'G': [{'1': 1}, {'2': 1}, {'3': 1}, {'4': 1}, {'5': 1}, {'6': 1}, {'7': 1}, {'8': 1}, {'9': 1}],
    },
    seatsPicked:[
    ],
    activeHour:null
};

const setActiveHour = (state, action) => {
    let hourVar;
    if(state.activeHour===action.activeHour)
    {
        hourVar=null;
    }
    else{
        hourVar=action.activeHour;
    }
    return updateObject(state, { activeHour: hourVar });
};
const fetchMovieStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchMovieSuccess = (state, action) => {
    return updateObject(state, { loading: false, numberOfReservations: action.numberOfReservations });
};

const fetchMovieFail = (state, action) => {
    return updateObject(state, { loading: false, numberOfReservations: action.numberOfReservations });
};
const addItem = (state, action) => {
    console.log(action);
    let newSeat = {seatRow:action.seatRow,seatNum:action.seatNum},found=false, indexFound=null;
    
    console.log(state.seatsPicked.length);
    if(state.seatsPicked.length===0)
    {   
        let newState = [...state.seatsPicked];
        return updateObject(state, {
            seatsPicked: newState.concat(newSeat)
        });
    }
    
    state.seatsPicked.map((obj,index)=>{
        if(obj.seatRow===action.seatRow&&obj.seatNum===action.seatNum){
            indexFound=index;
            found=true;
        }
        return obj;
    })

    if(found){
        let newState = [...state.seatsPicked];
        newState.splice(indexFound, 1);
        return updateObject(state, {
            seatsPicked: newState
        });
    }
    else{
        console.log(state.seatsPicked);
        console.log(newSeat);
        return updateObject(state, {
            seatsPicked: state.seatsPicked.concat(newSeat)
        });
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIE_START: return fetchMovieStart(state, action);
        case actionTypes.FETCH_MOVIE_SUCCESS: return fetchMovieSuccess(state, action);
        case actionTypes.FETCH_MOVIE_FAIL: return fetchMovieFail(state, action);
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.SET_ACTIVE_HOUR: return setActiveHour(state, action);
        default: return state;
    }
};

export default reducer;