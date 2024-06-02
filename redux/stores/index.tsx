import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import rootReducers from "@/redux/reducers";
import rootSagas from "@/redux/sagas";

const sagaMiddleware = createSagaMiddleware();
const stores = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSagas);

export default stores;
