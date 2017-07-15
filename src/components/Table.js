import React, {Component} from 'react';
import Contact from './Contact';
import AddContactForm from './AddContactForm'
import PropTypes from 'prop-types';

class Table extends Component {
    constructor() {
        super();
        this.sortBy = "firstName";
        this.reverse = false;
        this.sortData = this.sortData.bind(this);
        this.filter = this.filter.bind(this);
        this.removeFromTable = this.removeFromTable.bind(this);
        this.state = {
            filteredContacts: ["contact-1500081533520", "contact-1500081713071", "contact-1500081647479"]
        }
    }
    //searchs contacts
    filter() {
        const filteredContacts = [];
        //for every contact in the state
        for (let contact in this.props.contacts) {
            //checks if the contact  includes the term search criteria. Case insensitive.
            if (this.props.contacts[contact][this.filterBy.value].toUpperCase().includes(this.filterTerm.value.toUpperCase())) {
                filteredContacts.push(contact); //adds to an array
            }
        }
        this.setState({filteredContacts}); //updates the state of contacts to display
    }
    //sorts the data in the table, takes an array, the sorted field and a boolean that determines order
    sortData = function (data, sortBy, reverse) {
        const env = this;
        //creates an array of ids and the selected sort criteria.
        data = data.map(function(a){
            return [a, env.props.contacts[a][sortBy]]
        });
        //sorting algorithm for both numbers and strings
        return data.sort(function (a, b) {
            //if its a number performs substraction
            if (!isNaN(a[1])) {
                if (reverse) {
                    return b[1] - a[1]
                } else return a[1] - b[1]
            }
            //else uses local compare
            if (reverse) {
                return b[1].localeCompare(a[1])
            } else return a[1].localeCompare(b[1]);
            //returns only the ids in order
        }).map(function(a){
            return a[0];
        });
    }
    //changes the order by clicking twice on a header
    sortTable(newSortBy) {
        if(this.sortBy === newSortBy){
            this.reverse = !this.reverse;
        }
        else {
            this.sortBy = newSortBy;
        }
        this.forceUpdate();
    }
    createContact(event){
        event.preventDefault();
        const contact = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            phoneNumber: this.phoneNumber.value,
            address: this.address.value,
            email: this.email.value
        }   
        this.props.addContact(contact);
    }
    //removes contact from table on delete
    removeFromTable(key) {
        const filteredContacts = this.state.filteredContacts;
        var index = filteredContacts.indexOf(key);
        if(index>-1){
            filteredContacts.splice(index,1);
        }
        this.setState({filteredContacts});
    }
    render() {
        return (
            <div className="Table">
                <div className="form-group row">
                    <div className="col-3">
                        <input
                        ref={(input) => this.filterTerm = input}
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        onChange={() => this.filter()}/>
                    </div>
                    <div className="col-3">
                    <select className="form-control" ref={(input) => this.filterBy = input} onChange={() => this.filter()}>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="phoneNumber">Phone Number</option>
                        <option value="address">Address</option>
                        <option value="email">Email</option>
                    </select>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-inverse">
                        <tr className="thead-inverse">
                            <td></td>
                            <td onClick={() => this.sortTable("firstName")}>First Name</td>
                            <td onClick={() => this.sortTable("lastName")}>Last Name</td>
                            <td onClick={() => this.sortTable("phoneNumber")}>Phone Number</td>
                            <td onClick={() => this.sortTable("address")}>Address</td>
                            <td onClick={() => this.sortTable("email")}>Email</td>                            
                        </tr>
                    </thead>
                    <tbody>
                        {   //loops through the sorted and filtered contacts
                            this.sortData(this.state.filteredContacts, this.sortBy, this.reverse)
                            .map(key => <Contact
                                key={key}
                                index={key}
                                updateContact={this.props.updateContact}
                                removeFromTable={this.removeFromTable}
                                removeContact={this.props.removeContact}
                                contacts={this.props.contacts}/>)
}
                    </tbody>
                </table>
                  <AddContactForm addContact={this.props.addContact} updateContact={this.props.updateContact} filter={this.filter}/> 
            </div>
        );
    }
}

Table.propTypes = {
    contacts: PropTypes.object.isRequired,
    updateContact: PropTypes.func.isRequired,
    addContact: PropTypes.func.isRequired,
    removeContact: PropTypes.func.isRequired,
}

export default Table;
