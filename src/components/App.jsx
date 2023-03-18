import React from 'react';
import { useSelector } from 'react-redux';
import styles from './App.module.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export function App() {
  const contacts = useSelector(state => state.contacts.list);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Phonebook</h1>
      <ContactForm contacts={contacts} />

      <h2 className={styles.heading}>Contacts</h2>
      {contacts.length > 0 ? (
        <div>
          <Filter />
          <ContactList contacts={contacts} />
        </div>
      ) : (
        <p>Your phonebook is empty. Please add contacts.</p>
      )}
    </div>
  );
}
