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
            <div >
                <h3>Add New Contact</h3>
                <form ref={(form) => this.contactForm = form} onSubmit={(e) => this.createContact(e)}>
                    <div className="form-group row">
                        <label for="firstName" className="col-2 col-form-label">First Name</label>
                        <div className="col-10">
                            <input className="form-control" id="firstName" type="text" ref={(input) => this.firstName = input} placeholder='First Name'required/>                            
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="lastName" className="col-2 col-form-label">Last Name</label>
                        <div className="col-10">
                            <input className="form-control" id="lastName" type="text" ref={(input) => this.lastName = input} placeholder='First Name'required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="phoneNumber" className="col-2 col-form-label">Phone Number</label>
                        <div className="col-10">
                            <input id="phoneNumber" className="form-control" type="tel" ref={(input) => this.phoneNumber = input} placeholder='Phone Number'required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="firstName" className="col-2 col-form-label">Address</label>
                        <div className="col-10">
                            <input id="address" className="form-control" type="text" ref={(input) => this.address = input} placeholder='Address'required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="firstName" className="col-2 col-form-label">Email Address</label>
                        <div className="col-10">
                            <input id="email" className="form-control" type="email" ref={(input) => this.email = input} placeholder='Email'required/>    
                        </div>
                    </div>
                    <input className="form-control" className="btn btn-info" type="submit"/>
                </form>
            </div>
        );
    }
}

export default AddContactForm;
