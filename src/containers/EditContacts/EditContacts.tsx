import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import { selectIsFetchingOne, selectOneContact } from '../../store/slices/contactsSlices.ts';
import { editContact, getOneContact } from '../../store/thunks/contactsThunks.ts';
import Spinner from '../../components/UI/Spinner.tsx';


const EditContact = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const oneContact = useAppSelector(selectOneContact)
  const navigate = useNavigate();
  const isLoadingOneContact = useAppSelector(selectIsFetchingOne);


  useEffect(() => {
    if (id) {
      dispatch(getOneContact(id));
    }
  }, [id, dispatch]);

  const submitContact = async (contact: IContacts) => {
    const contactCopy = {...contact};
    delete contactCopy.id;

    await dispatch(editContact({id: id, contact: contactCopy}))
    navigate('/');
  };

  return (
    <>
      {isLoadingOneContact ? <Spinner/> :
        <>
          {oneContact ?
            <ContactForm submitContact={submitContact} contact={oneContact} isEdit/>
            :
            null
          }
        </>
      }
    </>
  );
};

export default EditContact;