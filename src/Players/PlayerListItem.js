import React from 'react';
import './PlayerListItem.css';

const PlayerListItem = ( { player, onRemovePressed, onCompletedPressed } ) => (
    <div className="player-item-container">
        <h3>{ player.text }</h3>
        <div className="buttons-container">
            { player.isCompleted ? null :
                <button
                    onClick={ () => onCompletedPressed( player.text ) }
                    className="completed-button">Mark As Completed</button>
            }

            <button
                onClick={ () => onRemovePressed( player.text ) }
                className="remove-button">Remove
            </button>
        </div>
    </div>
);

export default PlayerListItem;