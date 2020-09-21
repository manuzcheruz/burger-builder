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
        {controls.map(item => (
            <BuildControl 
                key={item.label} 
                label={item.label}
                added={() => props.ingredientAdded(item.type)}
                removed={() => props.ingredientRemoved(item.type)} />
        ))}
    </div>
);

export default buildControls;