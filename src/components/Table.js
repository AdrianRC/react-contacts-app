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
        this.filteredContacts = ["contact-1500081533520", "contact-1500081647479", "contact-1500081713071"];
        // this.state = {
        //     filteredContacts: ["contact-1500081533520", "contact-1500081647479", "contact-1500081713071"]
        // }
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
    render() {
        return (
            <div className="Table">
                <div className="Filter">
                    <input
                        ref={(input) => this.filterTerm = input}
                        type="text"
                        placeholder="Filter"
                        onChange={() => this.filter()}/>
                    <select ref={(input) => this.filterBy = input} onChange={() => this.filter()}>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="phoneNumber">Phone Number</option>
                        <option value="address">Address</option>
                        <option value="email">Email</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td><button onClick={() => this.sortTable("firstName")}>First Name</button></td>
                            <td><button onClick={() => this.sortTable("lastName")}>Last Name</button></td>
                            <td><button onClick={() => this.sortTable("phoneNumber")}>Phone Number</button></td>
                            <td><button onClick={() => this.sortTable("address")}>Address</button></td>
                            <td><button onClick={() => this.sortTable("email")}>Email</button></td>                            
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.sortData(this.state.filteredContacts, this.sortBy, this.reverse)
                            .map(key => <Contact
                                key={key}
                                index={key}
                                updateContact={this.props.updateContact}
                                contacts={this.props.contacts}/>)
}
                    </tbody>
                </table>
                 <AddContactForm addContact={this.props.addContact} filter={this.filter}/>
            </div>
        );
    }
}

export default Table;
