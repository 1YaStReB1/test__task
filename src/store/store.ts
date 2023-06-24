import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice";
import eventSlice from "./eventSlice";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/eventSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  devTools: true,
  reducer: {
    video: videoSlice,
    events: eventSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
