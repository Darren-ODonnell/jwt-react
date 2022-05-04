import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeCompetition, editCompetition } from '../actions';
import CompetitionListItem from "./CompetitionListItem";
import NewCompetitionForm from "./NewCompetitionForm";
import { displayAlert, loadCompetitions } from "./thunks";
import './CompetitionList.css';
import { isLoading } from "./reducers";


const CompetitionList = ( { competitions = [], onRemovePressed, onDisplayAlertClicked, startLoadingCompetitions } ) => {

    competitions = loadCompetitions();

    useEffect( () => {
        startLoadingCompetitions();
    } );
    const loadingMessage = <div>Loading competitions...</div>;

    const content = (
        <div className="list-wrapper">
            <NewCompetitionForm/> {
            competitions.map( competition => <CompetitionListItem
                competition={ competition }
                onRemovePressed={ onRemovePressed }
                onDisplayAlertClicked={ onDisplayAlertClicked }/> ) }
        </div>
    );
    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ( {
    isLoading: state.isLoading,
    competitions: state.competitions,
} );

const mapDispatchToProps = dispatch => ( {
    startLoadingCompetitions: () => dispatch( loadCompetitions() ),
    onRemovePressed: text => dispatch( removeCompetition( text ) ),
    onCompletedPressed: text => dispatch( editCompetition( text ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( CompetitionList );