import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";


export const createContact = createAsyncThunk<void, IContact>(
  'contacts/createContact',
  async (contactToCreate) => {
    await axiosAPI.post('contacts.json', contactToCreate);
  }
);


export const getAllContacts = createAsyncThunk<IContacts[], void>(
  'contacts/getAllContacts',
  async () => {
    const response = await axiosAPI<IContactsAPI | null>('contacts.json');

    const contactsObject = response.data;

    if (contactsObject === null) return [];

    const contactsArray: IContacts[] = Object.keys(contactsObject).map(idContact => {
      return {
        ...contactsObject[idContact],
        id: idContact,
      };
    });

    return contactsArray;
  }
);

export const getOneContact = createAsyncThunk<IContacts | null, string>(
  'contacts/getOneContact',
  async (id) => {
    const res = await axiosAPI<IContact | null>(`contacts/${id}.json`);

    if (!res.data) return null;
    return {...res.data, id: id};
  }
)

export const deleteOneContact = createAsyncThunk<void, string>(
  'contacts/deleteOneContact',
  async (id) => {
    await axiosAPI.delete(`contacts/${id}.json`);
  }
)

export const editContact = createAsyncThunk<void, {id: string, contact: IContact}>(
  'contacts/editContact',
  async ({id, contact}) => {
    await axiosAPI.put(`contacts/${id}.json`, contact);
  }
);