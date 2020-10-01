import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            streets: '',
            postalCode: ''
        }
    }
    render () {
        return (
            <div className={classes.ContactData}>
                <h1>Enter your contact data</h1>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Enter your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Enter your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Enter your postal code" />
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;