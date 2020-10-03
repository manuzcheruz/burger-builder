import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            streets: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let x = JSON.stringify(this.props.ingredients);
        console.log(typeof x);
        // console.log(this.props);
        // alert('You have accepted to continue with your purchase!');
        const order = {
            ingredients: x,
            price: this.props.price,
            customer: {
                name: 'Manuz',
                address: {
                    street: 'Test 1',
                    zipCode: '20200',
                    country: 'Kenya'
                },
                email: 'new'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch( error => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Enter your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Enter your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Enter your postal code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h1>Enter your contact data</h1>
                {form}
            </div>
        );
    }
}

export default ContactData;