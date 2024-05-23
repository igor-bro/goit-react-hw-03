import { useEffect, useState } from 'react';
import './App.css';

import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';

// const contactsTemp = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

const STORAGE_KEY = 'contacts';

function getInitialContacts() {
  const storageData = localStorage.getItem(STORAGE_KEY);
  if (storageData) {
    try {
      return JSON.parse(storageData);
    } catch (error) {
      console.error(error.message);
    }
  }
  return [];
}

function App() {
  const [contacts, setContacts] = useState(getInitialContacts());
  const [search, setSearch] = useState('');

  function handleDeleteContact(id) {
    setContacts(contacts => contacts.filter(item => item.id !== id));
  }

  function handleAddContact(newContact) {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(contacts => [...contacts, newContact]);
  }

  function handleSearch(nowSearch) {
    setSearch(nowSearch);
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts =
    search.trim() === ''
      ? contacts.slice()
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox search={search} onSearch={handleSearch}>
        Find contacts by name
      </SearchBox>
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

export default App;
