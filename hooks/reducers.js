import { combineReducers } from 'redux';
import {
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
} from './action';

const initialState = {
  repos: [],
  isLoading: false,
  error: null,
};

const reposReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_REPOS_SUCCESS:
      return { ...state, isLoading: false, repos: action.payload };
    case FETCH_REPOS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  repos: reposReducer,
});

export default rootReducer;