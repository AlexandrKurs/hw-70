import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import { selectCreateContactLoading } from '../../store/slices/contactsSlices.ts';
import { createContact } from '../../store/thunks/contactsThunks.ts';



const NewContact = () => {
  const isLoading = useAppSelector(selectCreateContactLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitContact = async (contact: IContact) => {
    await dispatch(createContact(contact));
    navigate('/');
  };

  return (
    <>
      <ContactForm isLoading={isLoading} submitContact={submitContact}/>
    </>
  );
};

export default NewContact;