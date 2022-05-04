import React from 'react';
import './LastnameListItem.css';

const LastnameListItem = ( { lastname, onRemovePressed, onCompletedPressed } ) => (
    <div className="lastname-item-container">
        <h3>{ lastname.text }</h3>
        <div className="buttons-container">
            { lastname.isCompleted ? null :
                <button
                    onClick={ () => onCompletedPressed( lastname.text ) }
                    className="completed-button">Mark As Completed</button>
            }

            <button
                onClick={ () => onRemovePressed( lastname.text ) }
                className="remove-button">Remove
            </button>
        </div>
    </div>
);

export default LastnameListItem;