export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

export type ContactGetRes = {
  data: Contact[] | Contact;
  message: string;
};

export type ContactPostRes = {
  message: string;
};

export type ContactDataType = {
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
};

export type ContactsState = {
  data: Contact[];
  filteredData: Contact[];
  message: string;
  loading: boolean;
  error?: string;
};

export type ReduxState = {
  contacts: ContactsState;
};
