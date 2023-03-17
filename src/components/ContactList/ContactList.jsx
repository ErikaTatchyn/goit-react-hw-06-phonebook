import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={s.item} key={id}>
          <span>{name}:</span>
          <span>{number}</span>
          <button
            className={s.button}
            type="button"
            onClick={() => handleDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
