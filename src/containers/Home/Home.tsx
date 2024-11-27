import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {deleteOneContact, getAllContacts, getOneContact} from "../../store/thunks/contactsThunks.ts";
import {
  selectAllContactsList,
  selectFetchingContactsLoading, selectIsFetchingOne,
  selectOneContact
} from "../../store/slices/contactsSlices.ts";
import Spinner from "../../components/UI/Spinner.tsx";
import Modal from "../../components/UI/Modal.tsx";
import {NavLink} from "react-router-dom";


const Home = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectAllContactsList);
  const oneContact = useAppSelector(selectOneContact)
  const isLoadingOneContact = useAppSelector(selectIsFetchingOne);
  const contactsLoading = useAppSelector(selectFetchingContactsLoading);

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch])

  const getDataAndShowModal = async (id: string | undefined) => {
    if (id) {
      setModal(true)

      await dispatch(getOneContact(id));
    }
  };

  const deleteContact = async (id: string | undefined) => {
    if (id) {
      await dispatch(deleteOneContact(id));
      setModal(false);
      await dispatch(getAllContacts());
    }
  };

  return (
    <div className="container">
      {modal ? <Modal show={modal} title='' closeModal={() => setModal(false)} defaultModalBtn>
        {isLoadingOneContact ? <Spinner/> : <>
          {oneContact ?
            <div>
              <div
                className="w-75 me-auto mb-4 p-3 d-flex justify-content-start align-items-center">
                <div>
                  <img width="100" src={oneContact.image} alt={oneContact.image}/>
                </div>
                <div className="ms-4">
                  <p className="m-0 pb-2"><b>Name: </b>{oneContact.name}</p>
                  <p className="m-0 pb-2"><b>Phone: </b>{oneContact.phone}</p>
                  <p className="m-0"><b>Email: </b>{oneContact.email}</p>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <NavLink className="w-25 me-1 btn btn-warning"
                         to={`/edit-contact/${oneContact.id}`}>Edit</NavLink>
                <button onClick={() => deleteContact(oneContact.id)}
                        className="w-25 ms-1 btn btn-danger">Delete
                </button>
              </div>

            </div>

            : null
          }
        </>}


      </Modal> : null}

      {contactsLoading ? <Spinner/> :
        <>
          {(contacts.length > 0) ?
            <>
              {contacts.map(contact => (
                <div key={contact.id}
                     onClick={() => getDataAndShowModal(contact.id)}
                     className="w-50 me-auto mb-4 border border-black p-3 d-flex justify-content-start align-items-center mx-auto">
                  <div>
                    <img width="100" src={contact.image} alt={contact.image}/>
                  </div>
                  <div className="w-50 ms-4">
                    <p className="m-0">{contact.name}</p>
                  </div>
                </div>
              ))}
            </>
            :
            <p>No contacts</p>
          }
        </>
      }


    </div>
  );
};

export default Home;