import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
        return (<li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>);
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>totla price: {props.price.toFixed(2)}</strong></p>
            <p>Continue with checkout?</p>
            <Button btnType="Danger" clicked={props.purchaceCancel}>CANCEL</Button>
            <Button btnType="Danger" clicked={props.purchaceContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;