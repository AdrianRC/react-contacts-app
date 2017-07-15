import React, {Component} from 'react';

class AddContactForm extends Component {
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
        this.props.filter();
    }
    render() {
        return (
            <form ref={(form) => this.contactForm = form} onSubmit={(e) => this.createContact(e)}>
                <input type="text" ref={(input) => this.firstName = input} placeholder='First Name'required/>
                <input type="text" ref={(input) => this.lastName = input} placeholder='Last Name'required/>
                <input type="tel" ref={(input) => this.phoneNumber = input} placeholder='Phone Number'required/>
                <input type="text" ref={(input) => this.address = input} placeholder='Address'required/>
                <input type="email" ref={(input) => this.email = input} placeholder='Email'required/>
                <input type="submit"/>
            </form>
        );
    }
}

export default AddContactForm;
