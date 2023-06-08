import shortid from 'shortid';
import { useState, useEffect } from "react";
import { Container } from "./Container/Container";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export function App () {

  const [contacts, setContacts] = useState([]);
  const [filter, setfilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if(parseContacts) {
      setContacts(prevContacts => [...prevContacts, ...parseContacts]);
    };
  
  }, [])
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  
  }, [contacts])

  const changeFilter = e => {
    setfilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact => 
        contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  const formSubmit = ({ name, number }) => {
      if (contacts.find(contact => contact.name === name) ) {
        alert(`${name} is already in contacts.`)
        return
      }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    }

    setContacts(prevContacts => [newContact, ...prevContacts])
};

  const deleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id),
    );
}

    const newContacts = filterContacts();
    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={formSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter}/>
        {contacts.length > 0 ? (<ContactList contacts={newContacts} onClick={deleteContact}/>) : (<p>Your phonebook is empty. Please add contact.</p> )} 
        
      </Container>
    )
}