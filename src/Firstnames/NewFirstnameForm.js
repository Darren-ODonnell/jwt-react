import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createFirstname } from '../actions';
import './NewFirstnameForm.css';

const NewFirstnameForm = ( { firstnames, onCreatePressed } ) => {
    const [ inputValue, setInputValue ] = useState( '' );

    return (
        <div className="new-firstname-form">
            <input
                className="new-firstname-input"
                type="text"
                placeholder="Type your new firstname here"
                value={ inputValue }
                onChange={ e => setInputValue( e.target.value ) }/>
            <button
                onClick={ () => {
                    const isDuplicateText =
                        firstnames.some( firstname => firstname.text === inputValue );
                    if ( !isDuplicateText ) {
                        onCreatePressed( inputValue );
                        setInputValue( '' );
                    }
                } }
                className="new-firstname-button">
                Create Firstname
            </button>

        </div>
    );
};

const mapStateToProps = state => ( {
    firstnames: state.firstnames,
} );

const mapDispatchToProps = dispatch => ( {
    onCreatePressed: text => dispatch( createFirstname( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( NewFirstnameForm );