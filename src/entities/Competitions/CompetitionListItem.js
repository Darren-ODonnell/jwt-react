import React from 'react';
import './CompetitionListItem.css';

const CompetitionListItem = ( { competition, onRemovePressed, onCompletedPressed } ) => (
    <div className="competition-item-container">
        <h3>{ competition.text }</h3>
        <div className="buttons-container">
            { competition.isCompleted ? null :
                <button
                    onClick={ () => onCompletedPressed( competition.text ) }
                    className="completed-button">Mark As Completed</button>
            }

            <button
                onClick={ () => onRemovePressed( competition.text ) }
                className="remove-button">Remove
            </button>
        </div>
    </div>
);

export default CompetitionListItem;