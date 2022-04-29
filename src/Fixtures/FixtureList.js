import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeFixture, editFixture } from '../actions';
import FixtureListItem from "./FixtureListItem";
import NewFixtureForm from "./NewFixtureForm";
import { displayAlert, loadFixtures } from "./thunks";
import './FixtureList.css';
import { isLoading } from "./reducers";

const FixtureList = ( { fixtures = [], onRemovePressed, onDisplayAlertClicked, startLoadingFixtures } ) => {


    fixtures = loadFixtures();

    useEffect( () => {
        startLoadingFixtures();
    } );

    const loadingMessage = <div>Loading clubs...</div>;

    const content = (
        <div className="list-wrapper">
            <NewFixtureForm/> {
            fixtures.map( fixture => <FixtureListItem
                fixture={ fixture }
                onRemovePressed={ onRemovePressed }
                onDisplayAlertClicked={ onDisplayAlertClicked }/> ) }
        </div>
    );
    return isLoading ? loadingMessage : content;
}
const mapStateToProps = state => ( {
    isLoading: state.isLoading,
    fixtures: state.fixtures,
} );

const mapDispatchToProps = dispatch => ( {
    startLoadingFixtures: () => dispatch( loadFixtures() ),
    onRemovePressed: text => dispatch( removeFixture( text ) ),
    onCompletedPressed: text => dispatch( editFixture( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( FixtureList );