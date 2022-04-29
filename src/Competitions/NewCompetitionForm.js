import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createCompetition } from '../actions';
import './NewCompetitionForm.css';

const NewCompetitionForm = ( { competitions, onCreatePressed } ) => {
    const [ inputValue, setInputValue ] = useState( '' );

    return (
        <div className="new-competition-form">
            <input
                className="new-competition-input"
                type="text"
                placeholder="Type your new competition here"
                value={ inputValue }
                onChange={ e => setInputValue( e.target.value ) }/>
            <button
                onClick={ () => {
                    const isDuplicateText =
                        competitions.some( competition => competition.text === inputValue );
                    if ( !isDuplicateText ) {
                        onCreatePressed( inputValue );
                        setInputValue( '' );
                    }
                } }
                className="new-competition-button">
                Create Competition
            </button>

        </div>
    );
};

const mapStateToProps = state => ( {
    competitions: state.competitions,
} );

const mapDispatchToProps = dispatch => ( {
    onCreatePressed: text => dispatch( createCompetition( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( NewCompetitionForm );