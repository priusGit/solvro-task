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
export const addItemOnClickAction = (item, price) => {
    return {
        type: actionTypes.ADD_ITEM,
        item: item,
        price: price
    };
}
export const deleteItemFromBasketAction = (item, price,id) => {
    return {
        type: actionTypes.DELETE_ITEM,
        item: item,
        price: price,
        id:id
    };
};