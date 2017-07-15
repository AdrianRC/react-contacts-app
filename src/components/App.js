import React, {Component} from 'react';
import '../css/bootstrap/bootstrap.css';
import '../css/App.css';
import Table from './Table';

class App extends Component {
  constructor() {
    super();
    this.addContact = this.addContact.bind(this);
    this.state = {
      contacts: {
        "contact-1500081533520": {
          "firstName": "James",
          "lastName": "Potter",
          "phoneNumber": "1 (111) 111-1111",
          "address": "Street #111",
          "email": "james.potter@gmail.com"
        },
        "contact-1500081647479": {
          "firstName": "Mary",
          "lastName": "Doe",
          "phoneNumber": "5 (555) 555-5555",
          "address": "Avenue 555",
          "email": "mary.doe@aol.com"
        },
        "contact-1500081713071": {
          "firstName": "Peter",
          "lastName": "Smith",
          "phoneNumber": "9 (999) 999-9999",
          "address": "Boulevard Apt. 99",
          "email": "peter.smith@live.com.de"
        }
      }
    }
  }
  addContact(contact) {
    const contacts = {
      ...this.state.contacts
    };
    const timestamp = Date.now();
    contacts['contact-' + timestamp] = contact;
    this.setState({contacts});
  }
  render() {
    return (
      <div className="App">
        <Table contacts={this.state.contacts} addContact={this.addContact}/>
      </div>
    );
  }
}

export default App;
