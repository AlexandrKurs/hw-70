import {useState} from "react";
import ButtonLoading from "../UI/ButtonLoading.tsx";
import {NavLink} from "react-router-dom";


interface Props {
  isLoading?: boolean;
  submitContact: (contactToCreate: IContact) => void;
  contact?: IContact;
  isEdit?: boolean;
}

const initialState = {
  name: '',
  phone: '',
  email: '',
  image: '',
};

const ContactForm: React.FC<Props> = ({isLoading=false, submitContact, contact=initialState, isEdit = false}) => {
  const [form, setForm] = useState(contact);

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const key in form) {
      if (!form[key as keyof typeof form]) {
        return alert('Please fill in all fields');
      }
    }

    submitContact({...form});
  };

  return (
    <form onSubmit={onSubmit} className="w-50 mx-auto row">
      <h3 className="text-center">{isEdit ? 'Edit' : 'Add'} contact</h3>
      <div className="form-group mb-2">
        <label htmlFor="name">Title:</label>
        <input
          type="text"
          onChange={changeForm}
          value={form.name}
          id="name"
          name="name"
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="name">Phone:</label>
        <input
          type="text"
          onChange={changeForm}
          value={form.phone}
          id="phone"
          name="phone"
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="name">Email:</label>
        <input
          type="text"
          onChange={changeForm}
          value={form.email}
          id="email"
          name="email"
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="urlImage">Url image:</label>
        <input
          value={form.image}
          type="url"
          id="image"
          name="image"
          onChange={changeForm}
          className="form-control"
        />
      </div>

      {form.image !== '' ?
        <div className="w-25 mb-3">
          <img width="100" src={form.image} alt={form.name}/>
        </div>
        : null
      }

      <div className="mx-auto d-flex justify-content-between">
        <ButtonLoading text={isEdit ? 'Edit' : 'Add'} isLoading={isLoading} isDisabled={isLoading}/>
        <NavLink to='/' className="btn btn-info">Go back</NavLink>
      </div>
    </form>
  );
};

export default ContactForm;