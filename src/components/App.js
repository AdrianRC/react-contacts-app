import React, {Component} from 'react';
import '../css/bootstrap/bootstrap.css';
import '../css/App.css';
import Table from './Table';

class App extends Component {
  constructor() {
    super();
    this.addContact = this.addContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.removeContact = this.removeContact.bind(this);
    this.state = {
      //sample contacts
      contacts: {
        "contact-1500081533520": {
          "firstName": "James",
          "lastName": "Potter",
          "phoneNumber": "1 (111) 111-1111",
          "address": "Street #111",
          "email": "james.potter@gmail.com"
        },
        "contact-1500081713071": {
          "firstName": "Pedro",
          "lastName": "Ramirez",
          "phoneNumber": "9 (999) 999-9999",
          "address": "Boulevard Apt. 99",
          "email": "pedro.ramirez@hotmail.de"
        },
        "contact-1500081647479": {
          "firstName": "Mary",
          "lastName": "Smith",
          "phoneNumber": "5 (555) 555-5555",
          "address": "Avenue 555",
          "email": "maria.smith@aol.com"
        }
      }
    }
  }
  addContact(contact) {
    //takes copy of current contacts
    const contacts = {
      ...this.state.contacts
    };
    const timestamp = Date.now(); //uses timestamp as a form of an incremental and unique id
    contacts['contact-' + timestamp] = contact; //adds the new contact under the new id
    this.setState({contacts}); //saves the state
  }
  updateContact(key, updatedContact) {
    const contacts = {
      ...this.state.contacts
    };
    contacts[key] = updatedContact;
    this.setState({contacts});
  }
  removeContact(key) {
    const contacts = {...this.state.contacts};
    delete contacts[key];
    this.setState({ contacts });
  }
  render() {
    return (
      <div className="container">
        <h2>React Contact App</h2>
        <Table contacts={this.state.contacts} addContact={this.addContact} updateContact={this.updateContact} removeContact={this.removeContact}/>
      </div>
    );
  }
}

export default App;
