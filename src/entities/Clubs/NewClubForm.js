import React, { useState } from 'react';
import './NewClubForm.css';

const NewClubForm = ( ) => {
    const [ inputValue, setInputValue ] = useState( '' );
    const [clubs, ] = useState();

    return (
        <div className="new-club-form">
            {/*<input*/}
            {/*    className="new-club-input"*/}
            {/*    type="text"*/}
            {/*    placeholder="Type your new club here"*/}
            {/*    value={ inputValue }*/}
            {/*    onChange={ e => setInputValue( e.target.value ) }/>*/}
            {/*<button*/}
            {/*    onClick={ () => {*/}
            {/*        const isDuplicateText =*/}
            {/*            clubs.some( club => club.text === inputValue );*/}
            {/*        if ( !isDuplicateText ) {*/}
            {/*            onCreatePressed( inputValue );*/}
            {/*            setInputValue( '' );*/}
            {/*        }*/}
            {/*    } }*/}
            {/*    className="new-club-button">*/}
            {/*    Create Club*/}
            {/*</button>*/}

        </div>
    );
};



export default NewClubForm ;