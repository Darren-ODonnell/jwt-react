import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeLastname, editLastname } from '../actions';
import LastnameListItem from "./LastnameListItem";
import NewLastnameForm from "./NewLastnameForm";
import { displayAlert, loadLastnames } from "./thunks";
import './LastnameList.css';
import { isLoading } from "./reducers";

const LastnameList = ( { lastnames = [], onRemovePressed, onDisplayAlertClicked, startLoadingLastnames } ) => {

    lastnames = loadLastnames();

    useEffect( () => {
        startLoadingLastnames();
    } );

    const loadingMessage = <div>Loading clubs...</div>;

    const content = (
        <div className="list-wrapper">
            <NewLastnameForm/>
            { lastnames.map( lastname => <LastnameListItem
                lastname={ lastname }
                onRemovePressed={ onRemovePressed }
                onDisplayAlertClicked={ onDisplayAlertClicked }/> ) }
        </div>
    );
    return isLoading ? loadingMessage : content;
}
const mapStateToProps = state => ( {
    isLoading: state.isLoading,
    lastnames: state.lastnames,
} );

const mapDispatchToProps = dispatch => ( {
    startLoadingCLastnames: () => dispatch( loadLastnames() ),
    onRemovePressed: text => dispatch( removeLastname( text ) ),
    onCompletedPressed: text => dispatch( editLastname( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( LastnameList );