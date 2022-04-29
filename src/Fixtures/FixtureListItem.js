import React from 'react';
import './FixtureListItem.css';

const FixtureListItem = ( { fixture, onRemovePressed, onCompletedPressed } ) => (
    <div className="fixture-item-container">
        <h3>{ fixture.text }</h3>
        <div className="buttons-container">
            { fixture.isCompleted ? null :
                <button
                    onClick={ () => onCompletedPressed( fixture.text ) }
                    className="completed-button">Mark As Completed</button>
            }

            <button
                onClick={ () => onRemovePressed( fixture.text ) }
                className="remove-button">Remove
            </button>
        </div>
    </div>
);

export default FixtureListItem;