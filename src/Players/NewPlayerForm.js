import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPlayer } from '../actions';
import './NewPlayerForm.css';

const NewPlayerForm = ( { players, onCreatePressed } ) => {
    const [ inputValue, setInputValue ] = useState( '' );

    return (
        <div className="new-player-form">
            <input
                className="new-player-input"
                type="text"
                placeholder="Type your new player here"
                value={ inputValue }
                onChange={ e => setInputValue( e.target.value ) }/>
            <button
                onClick={ () => {
                    const isDuplicateText =
                        players.some( player => player.text === inputValue );
                    if ( !isDuplicateText ) {
                        onCreatePressed( inputValue );
                        setInputValue( '' );
                    }
                } }
                className="new-player-button">
                Create Player
            </button>

        </div>
    );
};

const mapStateToProps = state => ( {
    players: state.players,
} );

const mapDispatchToProps = dispatch => ( {
    onCreatePressed: text => dispatch( createPlayer( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( NewPlayerForm );