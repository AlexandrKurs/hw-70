interface IContact {
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface IContactsAPI {
  [is: string]: IContact
}

interface IContacts extends IContact {
  id?: string;
}