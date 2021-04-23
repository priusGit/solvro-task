import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  title: null,
  sessions: null,
  arrangement: null,
  seatsPicked: [],
  activeHour: null,
  formData: null,
};

const setActiveHour = (state, action) => {
  let hourVar;
  if (state.activeHour === action.activeHour) {
    hourVar = null;
  } else {
    hourVar = action.activeHour;
  }
  return {
    ...state,
    activeHour: hourVar,
  };
};
const fetchMovieStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const saveFormData = (state, action) => {
  const UserData = {};
  for (let formElementIdentifier in action.formData) {
    UserData[formElementIdentifier] = action.formData[formElementIdentifier];
  }
  return {
    ...state,
    formData: UserData,
  };
};
const saveFormPart = (state, action) => {
  const UserData = {};
  for (let formElementIdentifier in action.formPart) {
    if (action.formPart[formElementIdentifier] === "") {
      UserData[formElementIdentifier] = state.formData[formElementIdentifier];
    } else {
      UserData[formElementIdentifier] = action.formPart[formElementIdentifier];
    }
  }
  return {
    ...state,
    formData: UserData,
  };
};
const fetchMovieSuccess = (state, action) => {
  return {
    ...state,
    title: action.movieData.title,
    sessions: action.movieData.sessions,
    arrangement: action.movieData.arrangement,
  };
};

const fetchMovieFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};
const addItem = (state, action) => {
  let newSeat = { seatRow: action.seatRow, seatNum: action.seatNum },
    found = false,
    indexFound = null;

  if (state.seatsPicked.length === 0) {
    let newState = [...state.seatsPicked];
    return {
      ...state,
      seatsPicked: newState.concat(newSeat),
    };
  }

  state.seatsPicked.map((seat, index) => {
    if (seat.seatRow === action.seatRow && seat.seatNum === action.seatNum) {
      indexFound = index;
      found = true;
    }
    return seat;
  });

  if (found) {
    let newState = [...state.seatsPicked];
    newState.splice(indexFound, 1);
    return {
      ...state,
      seatsPicked: newState,
    };
  } else {
    return {
      ...state,
      seatsPicked: state.seatsPicked.concat(newSeat),
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIE_START:
      return fetchMovieStart(state, action);
    case actionTypes.FETCH_MOVIE_SUCCESS:
      return fetchMovieSuccess(state, action);
    case actionTypes.FETCH_MOVIE_FAIL:
      return fetchMovieFail(state, action);
    case actionTypes.ADD_ITEM:
      return addItem(state, action);
    case actionTypes.SET_ACTIVE_HOUR:
      return setActiveHour(state, action);
    case actionTypes.SAVE_FORM_DATA:
      return saveFormData(state, action);
    case actionTypes.SAVE_SOME_DATA:
      return saveFormPart(state, action);
    default:
      return state;
  }
};

export default reducer;
