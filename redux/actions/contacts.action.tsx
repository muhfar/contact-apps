import { PayloadAction } from "@reduxjs/toolkit";

import { Contact, ContactGetRes } from "@/types";

export enum CONTACTS_ACTION {
  FETCH_CONTACTS = "FETCH_CONTACTS",
  SAVE_CONTACTS = "SAVE_CONTACTS",
  FAILED_SERVICE_CONTACTS = "FAILED_SERVICE_CONTACTS",
  FILTER_CONTACTS = "FILTER_CONTACTS",
  RESET_FILTER_CONTACTS = "RESET_FILTER_CONTACTS"
}

export type ContactActionTypes =
  | PayloadAction<undefined>
  | PayloadAction<string>
  | PayloadAction<ContactGetRes>;

export const fetchContacts = (): PayloadAction<undefined> => ({
  type: CONTACTS_ACTION.FETCH_CONTACTS,
  payload: undefined
});

export const saveContacts = (
  payload: ContactGetRes
): PayloadAction<ContactGetRes> => ({
  type: CONTACTS_ACTION.SAVE_CONTACTS,
  payload
});

export const failedServiceContacts = (
  error: string
): PayloadAction<string> => ({
  type: CONTACTS_ACTION.FAILED_SERVICE_CONTACTS,
  payload: error
});

export const filterContact = (name: string): PayloadAction<string> => ({
  type: CONTACTS_ACTION.FILTER_CONTACTS,
  payload: name
});

export const clearFilterContact = (): PayloadAction<undefined> => ({
  type: CONTACTS_ACTION.RESET_FILTER_CONTACTS,
  payload: undefined
});
