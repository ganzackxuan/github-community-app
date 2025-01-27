import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_REPOS_REQUEST,
  fetchReposSuccess,
  fetchReposFailure,
} from './action';

// Selector to get the current repos state
const getRepos = (state) => state.repos.repos;

function* fetchReposSaga(action) {
  try {
    const { searchValue, page } = action.payload;
    const response = yield call(
      axios.get,
      `https://api.github.com/search/repositories?q=${searchValue}+org:react-native-community&per_page=10&page=${page}`
    );

    let newRepos = response.data.items;

    if (page > 1) {
      const currentRepos = yield select(getRepos);
      const currentRepoIds = new Set(currentRepos.map(repo => repo.id));
      newRepos = [...currentRepos, ...newRepos.filter(repo => !currentRepoIds.has(repo.id))];
    }

    yield put(fetchReposSuccess(newRepos));
  } catch (error) {
    yield put(fetchReposFailure(error.message));
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_REPOS_REQUEST, fetchReposSaga);
}

export default rootSaga;