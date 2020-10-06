import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler  from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
        
    }

    componentDidMount () {
        // axios.get('https://burger-builder-react-c76e6.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // encoding data being passed in the url
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo <= 0
        }

        let orderSummary = null

        let burger = this.state.error ? <p>The ingredients could not be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdd}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchaseHandler}
                    price={this.props.price} />
            </Aux>
        );
        orderSummary = <OrderSummary 
                        ingredients={this.props.ings}
                        price={this.props.price}
                        purchaceContinue={this.purchaseContinueHandler}
                        purchaceCancel={this.purchaseCancelHandler}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const dispatchToReducer = dispatch => {
    return {
        onIngredientAdd: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
        onIngredientRemoved: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name}),
    };
}
 
export default connect(mapStateToProps, dispatchToReducer)(withErrorHandler(BurgerBuilder, axios));