import axios from "axios";

import {
  Contact,
  ContactDataType,
  ContactGetRes,
  ContactPostRes
} from "@/types";

const BASE_URL = "https://contact.herokuapp.com/contact";

const fetchContacts = async (id?: string): Promise<ContactGetRes> => {
  try {
    const fetchUrl = id ? BASE_URL + "/" + id : BASE_URL;
    const result = await axios.get<ContactGetRes>(fetchUrl);

    return result.data;
  } catch (error: any) {
    throw new Error("Failed fetch contacts");
  }
};

const postContact = async (contact: ContactDataType): Promise<void> => {
  try {
    await axios.post<ContactPostRes>(BASE_URL, contact);
  } catch (error) {
    throw new Error("Failed post contact");
  }
};

const deleteContact = async (id: Contact["id"]): Promise<void> => {
  try {
    await axios.delete<void>(BASE_URL + "/" + id);
  } catch (error) {
    throw new Error("Failed to delete contact");
  }
};

const updateContact = async (
  id: string,
  newContact: ContactDataType
): Promise<void> => {
  try {
    await axios.put<void>(BASE_URL + "/" + id, newContact);
  } catch (error) {
    throw new Error("Failed to update contact id: " + id);
  }
};

export default { fetchContacts, postContact, deleteContact, updateContact };
