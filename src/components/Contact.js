import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Contact extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    //handles updates to the contact and calls for a state update
    handleChange(e, key){
        const contact = this.props.contacts[key];
        const updatedContact = {...contact, [e.target.name]: e.target.value};
        this.props.updateContact(key, updatedContact);
    }
    //handles removal of a contact in both the state and the table view
    handleDelete(){
        this.props.removeFromTable(this.props.index); 
        this.props.removeContact(this.props.index);
    }
    render() {
        const details = this.props.contacts[this.props.index]
        return (
            <tr className="Contact">
                <td className="close" onClick={this.handleDelete}>x</td>                
                <td><input type="text" name='firstName' placeholder='First Name' value={details.firstName} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
                <td><input type="text" name='lastName' placeholder='Last Name' value={details.lastName} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
                <td><input type="tel" name='phoneNumber'placeholder='Phone Number' value={details.phoneNumber} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
                <td><input type="text" name='address' placeholder='Address' value={details.address} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
                <td><input type="email" name='email' placeholder='Email' value={details.email} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
            </tr>
        );
    }
}

//props validation
Contact.propTypes = {
    contacts: PropTypes.object.isRequired,
    updateContact: PropTypes.func.isRequired,
    removeFromTable: PropTypes.func.isRequired,
    removeContact: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired
}

export default Contact;
