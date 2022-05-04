import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createFixture } from '../actions';
import './NewFixtureForm.css';

const NewFixtureForm = ( { fixtures, onCreatePressed } ) => {
    const [ inputValue, setInputValue ] = useState( '' );

    return (
        <div className="new-fixture-form">
            <input
                className="new-fixture-input"
                type="text"
                placeholder="Type your new fixture here"
                value={ inputValue }
                onChange={ e => setInputValue( e.target.value ) }/>
            <button
                onClick={ () => {
                    const isDuplicateText =
                        fixtures.some( fixture => fixture.text === inputValue );
                    if ( !isDuplicateText ) {
                        onCreatePressed( inputValue );
                        setInputValue( '' );
                    }
                } }
                className="new-fixture-button">
                Create fixture
            </button>

        </div>
    );
};

const mapStateToProps = state => ( {
    fixtures: state.fixtures,
} );

const mapDispatchToProps = dispatch => ( {
    onCreatePressed: text => dispatch( createFixture( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( NewFixtureForm );