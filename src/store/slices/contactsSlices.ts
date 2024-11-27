import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createContact, getAllContacts, getOneContact} from "../thunks/contactsThunks.ts";
import {RootState} from "../../app/store.ts";



interface ToDoState {
  contacts: IContacts[],
  oneContact: IContacts | null,
  isCreate: boolean,
  isFetching: boolean,
  isFetchingOne: boolean,
}

const initialState: ToDoState = {
  contacts: [],
  oneContact: null,
  isCreate: false,
  isFetching: false,
  isFetchingOne: false,
};

export const selectCreateContactLoading = (state: RootState) => state.contacts.isCreate;
export const selectFetchingContactsLoading = (state: RootState) => state.contacts.isFetching;
export const selectAllContactsList = (state: RootState) => state.contacts.contacts;

export const selectOneContact = (state: RootState) => state.contacts.oneContact;
export const selectIsFetchingOne = (state: RootState) => state.contacts.isFetchingOne;


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isCreate = true;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.isCreate = false;
      })
      .addCase(createContact.rejected, (state) => {
        state.isCreate = false;
      })

      .addCase(getAllContacts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getAllContacts.fulfilled, (state, action: PayloadAction<IContacts[]>) => {
        state.contacts = action.payload;
        state.isFetching = false;
      })
      .addCase(getAllContacts.rejected, (state) => {
        state.isFetching = false;
      })

      .addCase(getOneContact.pending, (state) => {
        state.isFetchingOne = true;
        state.oneContact = null;
      })
      .addCase(getOneContact.fulfilled, (state, action: PayloadAction<IContacts | null>) => {
        state.oneContact = action.payload;
        state.isFetchingOne = false;
      })
      .addCase(getOneContact.rejected, (state) => {
        state.isFetchingOne = false;
      })

  }

});

export const contactsReducer = contactsSlice.reducer;