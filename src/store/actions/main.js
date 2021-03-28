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
        axios.post('/movie',
            {movie:link})
            .then(res => {
                dispatch(fetchMovieSuccess(res.data));
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
export const saveFormData = (formData) => {
    return {
        type: actionTypes.SAVE_FORM_DATA,
        formData:formData
    };
}
