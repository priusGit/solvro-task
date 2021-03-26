import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const fetchMovieStart = () => {

    return {
        type: actionTypes.FETCH_MOVIE_START
    };
};

export const fetchMovieSuccess = (data) => {

    return {
        type: actionTypes.FETCH_MOVIE_SUCCESS,
        movieData: data
    };
};

export const fetchMovieFail = (error) => {
    return {
        type: actionTypes.FETCH_MOVIE_FAIL,
        error: error
    };
}

export const setActiveHour = (activeHour) => {

    return {
        type: actionTypes.SET_ACTIVE_HOUR,
        activeHour: activeHour
    };
};

export const fetchMovie = (link) => {
    return dispatch => {
        dispatch(fetchMovieStart());
        axios.get('/ping')
            .then(res => {
                console.log(res);
                dispatch(fetchMovieSuccess(res));
            })
            .catch(err => {
                dispatch(fetchMovieFail(err));
            });
    }
}
export const seatPicked = (seatRow,seatNum) => {
    return {
        type: actionTypes.ADD_ITEM,
        seatRow:seatRow,
        seatNum:seatNum
    };
}
export const deleteItemFromBasketAction = (seatID, price,id) => {
    return {
        type: actionTypes.DELETE_ITEM,
        seatID: seatID
    };
};