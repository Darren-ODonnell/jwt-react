import React from 'react';
import './FirstnameListItem.css';

const FirstnameListItem = ( { firstname, onRemovePressed, onCompletedPressed } ) => (
    <div className="firstname-item-container">
        <h3>{ firstname.text }</h3>
        <div className="buttons-container">
            { firstname.isCompleted ? null :
                <button
                    onClick={ () => onCompletedPressed( firstname.text ) }
                    className="completed-button">Mark As Completed</button>
            }

            <button
                onClick={ () => onRemovePressed( firstname.text ) }
                className="remove-button">Remove
            </button>
        </div>
    </div>
);

export default FirstnameListItem;