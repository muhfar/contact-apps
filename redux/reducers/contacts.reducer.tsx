import { ContactGetRes, ContactsState } from "@/types";
import {
  CONTACTS_ACTION,
  ContactActionTypes
} from "@/redux/actions/contacts.action";

const initialState: ContactsState = {
  data: [],
  filteredData: [],
  message: "",
  loading: false,
  error: undefined
};

const onCallServiceState = (state: ContactsState): ContactsState => ({
  ...state,
  filteredData: [],
  loading: true,
  error: undefined
});

export default function (state = initialState, action: ContactActionTypes) {
  switch (action.type) {
    case CONTACTS_ACTION.FETCH_CONTACTS: {
      return onCallServiceState(state);
    }
    case CONTACTS_ACTION.SAVE_CONTACTS: {
      const { data, message } = action.payload as ContactGetRes;

      return {
        data,
        filteredData: data,
        message,
        loading: false,
        error: undefined
      };
    }
    case CONTACTS_ACTION.FAILED_SERVICE_CONTACTS: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case CONTACTS_ACTION.FILTER_CONTACTS: {
      const regexSearch = new RegExp(action.payload as string, "i");
      const filteredContacts = state.data.filter(
        ({ firstName, lastName }) =>
          regexSearch.test(firstName) || regexSearch.test(lastName)
      );

      return {
        ...state,
        filteredData: filteredContacts
      };
    }
    case CONTACTS_ACTION.RESET_FILTER_CONTACTS: {
      return {
        ...state,
        filteredData: state.data
      };
    }
    default:
      return state;
  }
}
