import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import styles from './App.module.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import {
  addContact,
  deleteContact,
  updateFilter,
} from '../redux/contactsSlice';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.list);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = ({ name, number }) => {
    const id = nanoid();
    dispatch(addContact({ id, name, number }));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleUpdateFilter = e => {
    dispatch(updateFilter(e.target.value));
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2 className={styles.heading}>Contacts</h2>
      {contacts.length > 0 ? (
        <div>
          <Filter value={filter} onChange={handleUpdateFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={handleDeleteContact}
          />
        </div>
      ) : (
        <p>Your phonebook is empty. Please add contacts.</p>
      )}
    </div>
  );
}
