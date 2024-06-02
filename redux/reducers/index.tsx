import { combineReducers } from "redux";

import contactReducers from "@/redux/reducers/contacts.reducer";

const rootReducers = combineReducers({
  contacts: contactReducers
});

export default rootReducers;
