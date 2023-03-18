import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import s from './ContactList.module.css';

function ContactList({ visibleContacts, handleDeleteContact }) {
  return (
    <ul className={s.list}>
      {visibleContacts.map(({ id, name, number }) => (
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
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  visibleContacts: state.contacts.list.filter(contact =>
    contact.name.toLowerCase().includes(state.contacts.filter.toLowerCase())
  ),
});

const mapDispatchToProps = {
  handleDeleteContact: deleteContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
