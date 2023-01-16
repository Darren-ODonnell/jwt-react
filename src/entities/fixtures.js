import {Fixture   , METHODS        , FIXTURE_URLS} from '../common/globals'
import {teams, competitions} from '../common/Dropdowns';
import {addMessage, copyFormColDefs, copyGridColDefs} from "../common/helper";

const languages = ['English', 'Spanish', 'French', 'Portuguese', '(other)']

// const gridOptions = {
//     columnDefs: [
//         { field: 'type' },
//         {
//             field: 'value',
//             editable: true,
//             cellEditorSelector: cellEditorSelector(props),
//         },
//     ],
//
//     onRowEditingStarted: onRowEditingStarted,
//     onRowEditingStopped: onRowEditingStopped,
//     onCellEditingStarted: onCellEditingStarted,
//     onCellEditingStopped: onCellEditingStopped,
// };

// function onRowEditingStarted(event) {
//     console.log('never called - not doing row editing');
// }
//
// function onRowEditingStopped(event) {
//     console.log('never called - not doing row editing');
// }
//
// function onCellEditingStarted(event) {
//     console.log('cellEditingStarted');
// }
//
// function onCellEditingStopped(event) {
//     console.log('cellEditingStopped');
// }

function cellEditorSelector(type) {

    if (type === 'Competition') {
        return {
            cellEditorParams: {
                cellHeight: 20,
                maxlength: 50,
                values: ['League Cup', 'Summer Cup','Championship'],
            },
        };
    }

    if (type === 'Club') {
        return {
            cellEditorParams: {
                maxlength: 50,
                cellHeight: 20,
                values: ['League Cup2', 'Summer Cup2','Championship2'],
            },
        };
    }

    return undefined;
}

const fixtureColumnDefs = [
    {
        headerName: 'Competition Name', field: 'competitionName', type: 'Competition',
        min: 8, max: 60, required: true,   minWidth: 100, cellEditorPopup: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams : cellEditorSelector('Competition'),

    }, {
        headerName: 'Home Team Name',
        field     : 'homeTeamName',
        type      : 'Club',
        min       : 8,
        max       : 60,
        required  : true,
        editable  : true,
        cellEditorPopup: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: cellEditorSelector('Club')
    }, {
        headerName: 'Away Team Name',
        field     : 'awayTeamName',
        type      : 'Club',
        min       : 8,
        max       : 60,
        required  : true,
        editable  : true,
        cellEditorPopup: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: cellEditorSelector('Club')
    },
    {headerName: 'Fixture Date', field: 'fixtureDate', type: 'Date', min: -1, max: 1, required: true},
    {headerName: 'Fixture Time', field: 'fixtureTime', type: 'Time', min: 0, max: 24, required: true},
    {headerName: 'Season', field: 'season', type: 'Season', min: 4, max: 4, required: true},
    {headerName: 'Round', field: 'round', type: 'Round', min: 1, max: 20, required: true},
];
const fixtureDropDown = true;

const fixtureInitialValue = {
    competitionName: "",
    homeTeamName   : "",
    awayTeamName   : "",
    fixtureDate    : "",
    fixtureTime    : "",
    season         : "",
    round          : ""
};

const apiRequests = {
    list          : {method: METHODS.GET, url: FIXTURE_URLS.list},
    findById      : {method: METHODS.GET, url: FIXTURE_URLS.findById},
    findByClub    : {method: METHODS.GET, url: FIXTURE_URLS.findByClub},
    findByHomeClub: {method: METHODS.GET, url: FIXTURE_URLS.findByHomeClub},
    findByAwayClub: {method: METHODS.GET, url: FIXTURE_URLS.findByAwayClub},
    nextByClub    : {method: METHODS.GET, url: FIXTURE_URLS.nextByClub},

    findByCompetitionHomeTeamAwayTeamFixtureDateSeason: {
        method: METHODS.GET,
        url   : FIXTURE_URLS.findByCompetitionHomeTeamAwayTeamFixtureDateSeason
    },

    update: {method: METHODS.POST  , url: FIXTURE_URLS.update},
    add   : {method: METHODS.PUT   , url: FIXTURE_URLS.add},
    delete: {method: METHODS.DELETE, url: FIXTURE_URLS.delete}
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            id: row.id,
            competitionName: row.competition.name,
            homeTeamName   : row.homeTeam.name,
            awayTeamName   : row.awayTeam.name,
            fixtureDate    : row.fixtureDate,
            fixtureTime    : row.fixtureTime,
            season         : row.season,
            round          : row.round,
            // not used in fixtureColumnDefs so not displayed in grid but used later when updating changes in fixtures.
            competition    : row.competition,
            homeTeam       : row.homeTeam,
            awayTeam       : row.awayTeam
        }
        newData.push(newRow)
    })
    return newData;
}

export const fixtureData = {
    messages    : addMessage(Fixture),
    type        : Fixture,
    initialValue: fixtureInitialValue,
    columnDefs  : fixtureColumnDefs,
    formColDefs : copyFormColDefs(fixtureColumnDefs), // form column definitions
    gridColDefs : copyGridColDefs(fixtureColumnDefs), // Grid column definitions
    methods     : apiRequests,
    dropDown    : fixtureDropDown,
    gridLoader  : gridLoader
};