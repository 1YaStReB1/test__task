import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";
import { fetchEvents, setEvents, setError, setEventsSuccess, setErrorUnSuccess } from "../eventSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function* handleFetchEvents(): Generator<any, void, any> {
  
  try {
    const response = yield call(
      axios.get,
      "http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd"
    );

  
    yield put(setEventsSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) yield put(setErrorUnSuccess(error.message));
  }
}

export function* eventsSaga() {
  yield takeLatest(fetchEvents.type, handleFetchEvents);
}

export default function* rootSaga() {
  yield all([eventsSaga()]);
}
