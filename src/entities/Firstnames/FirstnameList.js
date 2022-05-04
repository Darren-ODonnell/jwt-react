import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFirstname, editFirstname } from '../actions';
import FirstnameListItem from "./FirstnameListItem";
import NewFirstnameForm from "./NewFirstnameForm";
import { displayAlert, loadFirstnames } from "./thunks";
import './FirstnameList.css';
import { isLoading } from "./reducers";

const FirstnameList = ( { firstnames = [], onRemovePressed, onDisplayAlertClicked, startLoadingFirstnames } ) => {

    firstnames = loadFirstnames();

    useEffect( () => {
        startLoadingFirstnames();
    } );

    const loadingMessage = <div>Loading firstnames...</div>;

    const content = (
        <div className="list-wrapper">
            <NewFirstnameForm/> {
            firstnames.map( firstname => <FirstnameListItem
                firstname={ firstname }
                onRemovePressed={ onRemovePressed }
                onDisplayAlertClicked={ onDisplayAlertClicked }/> ) }
        </div>
    );
    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ( {
    isLoading: state.isLoading,
    firstnames: state.firstnames,
} );

const mapDispatchToProps = dispatch => ( {
    startLoadingFirstnames: () => dispatch( loadFirstnames() ),
    onRemovePressed: text => dispatch( removeFirstname( text ) ),
    onCompletedPressed: text => dispatch( editFirstname( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( FirstnameList );