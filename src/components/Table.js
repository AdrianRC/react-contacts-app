import React, {Component} from 'react';
import Contact from './Contact';
import AddContactForm from './AddContactForm'

class Table extends Component {
    constructor() {
        super();
        this.sortBy = "firstName";
        this.reverse = false;
        this.sortData = this.sortData.bind(this);
        this.filter = this.filter.bind(this);
        this.removeFromTable = this.removeFromTable.bind(this);
        this.state = {
            filteredContacts: ["contact-1500081533520", "contact-1500081647479", "contact-1500081713071"]
        }
    }
    filter() {
        const filteredContacts = [];
        for (let contact in this.props.contacts) {
            if (this.props.contacts[contact][this.filterBy.value].toUpperCase().includes(this.filterTerm.value.toUpperCase())) {
                filteredContacts.push(contact);
            }
        }
        this.setState({filteredContacts});
        this.forceUpdate();
    }
    sortData = function (data, sortBy, reverse) {
        const env = this;
        data = data.map(function(a){
            return [a, env.props.contacts[a][sortBy]]
        });
        return data.sort(function (a, b) {
            if (!isNaN(a[1])) {
                if (reverse) {
                    return b[1] - a[1]
                } else return a[1] - b[1]
            }
            if (reverse) {
                return b[1].localeCompare(a[1])
            } else return a[1].localeCompare(b[1]);
        }).map(function(a){
            return a[0];
        });
    }
    sortTable(newSortBy) {
        if(this.sortBy === newSortBy){
            this.reverse = !this.reverse;
        }
        //else
        this.sortBy = newSortBy;
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
        this.contactForm.reset();
        this.filter();
        this.forceUpdate();
    }
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
                        {   
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

export default Table;
