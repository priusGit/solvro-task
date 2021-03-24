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
    }
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
    let newItem = { item: action.item, price: action.price,amount:1 },found=false;
    const newPrice = Number(action.price) + state.fullPrice;
    const updatedOrderedItems = state.orderedItems.map(obj=>{
        if(obj.item===action.item){
            obj.amount=obj.amount+1;
            found=true;
            return obj; 
        }
        return obj;
    });
    if(found){
        return updateObject(state, {
            orderedItems: updatedOrderedItems,
            fullPrice: newPrice
        });
    }
    else{
        return updateObject(state, {
            orderedItems: state.orderedItems.concat(newItem),
            fullPrice: newPrice
        });
    }
};

const screenResize = (state, action) => {
    const newWidth = action.width;
    console.log(newWidth);
    return updateObject(state, {
        windowWidth: newWidth
    });
};

const deleteItem = (state, action) => {
    let helper;
    const newPrice = state.fullPrice - Number(action.price);
    const updatedOrderedItems = state.orderedItems.map(obj=>{
        if(obj.item===action.item){
            helper = obj.amount;
            if(obj.amount>1)
            {
                obj.amount=obj.amount-1;
            }
            console.log(obj.item+" "+action.item+" "+obj.amount+" "+helper);
            return obj; 
        }
        return obj;
    });
    if(helper>1){
        return updateObject(state, {
            orderedItems: updatedOrderedItems,
            fullPrice: newPrice
        });
    }
    else{
        let newState = [...state.orderedItems];
        newState.splice(action.id, 1);
        return {
            ...state, orderedItems: newState, fullPrice: newPrice
        };
    } 
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIE_START: return fetchMovieStart(state, action);
        case actionTypes.FETCH_MOVIE_SUCCESS: return fetchMovieSuccess(state, action);
        case actionTypes.FETCH_MOVIE_FAIL: return fetchMovieFail(state, action);
        case actionTypes.ADD_ITEM: return addItem(state, action);
        case actionTypes.DELETE_ITEM: return deleteItem(state, action);
        case actionTypes.SCREEN_RESIZE: return screenResize(state, action);
        default: return state;
    }
};

export default reducer;