import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { 
        label: 'Salad', 
        type: 'salad'},
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Meat',
        type: 'meat'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    }
]

const buildControls = (props) => (
    <div className={classes.BuildControl}>
        <p>Burger price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(item => (
            <BuildControl 
                key={item.label} 
                label={item.label}
                added={() => props.ingredientAdded(item.type)}
                removed={() => props.ingredientRemoved(item.type)}
                disabled={props.disabled[item.type]} />
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;