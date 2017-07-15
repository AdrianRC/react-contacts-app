import React, {Component} from 'react';

class Contact extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e, key){
        // const contact = this.props.contacts[key];
        // const updatedContact = {...contact, [e.target.name]: e.target.value};
        // this.props.updateContact(key, updatedContact);
    }
    render() {
        const details = this.props.contacts[this.props.index]
        return (
            <tr className="Contact">
                <td><input type="text" name='firstName' placeholder='First Name' value={details.firstName} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
                <td><input type="text" name='lastName' placeholder='Last Name' value={details.lastName} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
                <td><input type="tel" name='phoneNumber'placeholder='Phone Number' value={details.phoneNumber} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
                <td><input type="text" name='address' placeholder='Address' value={details.address} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
                <td><input type="email" name='email' placeholder='Email' value={details.email} onChange={(e) => this.handleChange(e, this.props.index)}/></td>
            </tr>
        );
    }
}

export default Contact;
