import shortid from 'shortid';
import { Component } from "react";
import { Container } from "./Container/Container";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {

  state = {
    contacts: [ 
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: '',
  }

  componentDidMount () {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    
    if(parseContacts) {
      this.setState({ contacts: parseContacts});
    }
  }

  componentDidUpdate (prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact => 
        contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  formSubmit = ({ name, number }) => {
      if (this.state.contacts.find(contact => contact.name === name) ) {
        alert(`${name} is already in contacts.`)
        return
      }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    }
    
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
};

  deleteContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

;}

  render() {
    const newContacts = this.filterContacts();
    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter}/>
        {this.state.contacts.length > 0 ? (<ContactList contacts={newContacts} onClick={this.deleteContact}/>) : (<p>Your phonebook is empty. Please add contact.</p> )} 
        
      </Container>
    )
  }

}