import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createLastname } from '../actions';
import './NewLastnameForm.css';

const NewLastnameForm = ( { lastnames, onCreatePressed } ) => {
    const [ inputValue, setInputValue ] = useState( '' );

    return (
        <div className="new-lastname-form">
            <input
                className="new-lastname-input"
                type="text"
                placeholder="Type your new lastname here"
                value={ inputValue }
                onChange={ e => setInputValue( e.target.value ) }/>
            <button
                onClick={ () => {
                    const isDuplicateText =
                        lastnames.some( lastname => lastname.text === inputValue );
                    if ( !isDuplicateText ) {
                        onCreatePressed( inputValue );
                        setInputValue( '' );
                    }
                } }
                className="new-lastname-button">
                Create Lastname
            </button>

        </div>
    );
};

const mapStateToProps = state => ( {
    lastnames: state.lastnames,
} );

const mapDispatchToProps = dispatch => ( {
    onCreatePressed: text => dispatch( createLastname( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( NewLastnameForm );