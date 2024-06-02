import { call, put, takeLatest } from "redux-saga/effects";

import services from "@/services";
import {
  failedServiceContacts,
  saveContacts,
  CONTACTS_ACTION
} from "@/redux/actions/contacts.action";
import { Contact, ContactGetRes } from "@/types";

const { fetchContacts } = services;

function* fetchContactsSaga() {
  try {
    const result: ContactGetRes = yield call(fetchContacts);

    yield put(saveContacts(result));
  } catch (error: any) {
    yield put(failedServiceContacts(error.message));
  }
}

function* rootSagas() {
  yield takeLatest(CONTACTS_ACTION.FETCH_CONTACTS, fetchContactsSaga);
}

export default rootSagas;
