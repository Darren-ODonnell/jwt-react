import {Fixture, METHODS, FIXTURE_URLS} from '../common/globals'
import {addMessage, copyFormColDefs, copyGridColDefs} from "../common/helper";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const fixtureColumnDefs = [
    {
        // cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: ['English', 'Spanish', 'French', 'Portuguese', '(other)'],
        },
        headerName: 'Competition Name', field: 'competitionName',
        min: 8, max: 60, required: true,
        // type: 'String',

    },
    {
        headerName: 'Home Team Name',
        field: 'homeTeamName',
        type: 'String',
        min: 8,
        max: 60,
        required: true,
        editable: true,
    },
    {
        headerName: 'Away Team Name',
        field: 'awayTeamName',
        type: 'String',
        min: 8,
        max: 60,
        required: true,
        editable: true,
    },
    {headerName: 'Fixture Date', field: 'fixtureDate', type: 'Date', min: -1, max: 1, required: true},
    {headerName: 'Fixture Time', field: 'fixtureTime', type: 'Long', min: 0, max: 24, required: true},
    {headerName: 'Season', field: 'season', type: 'Integer', min: 4, max: 4, required: true},
    {headerName: 'Round', field: 'round', type: 'Integer', min: 1, max: 20, required: true},
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
    list: {method: METHODS.GET, url: FIXTURE_URLS.list},
    findById: {method: METHODS.GET, url: FIXTURE_URLS.findById},
    findByClub: {method: METHODS.GET, url: FIXTURE_URLS.findByClub},
    findByHomeClub: {method: METHODS.GET, url: FIXTURE_URLS.findByHomeClub},
    findByAwayClub: {method: METHODS.GET, url: FIXTURE_URLS.findByAwayClub},
    nextByClub: {method: METHODS.GET, url: FIXTURE_URLS.nextByClub},

    findByCompetitionHomeTeamAwayTeamFixtureDateSeason: {
        method: METHODS.GET,
        url: FIXTURE_URLS.findByCompetitionHomeTeamAwayTeamFixtureDateSeason
    },

    update: {method: METHODS.POST, url: FIXTURE_URLS.update},
    add: {method: METHODS.PUT, url: FIXTURE_URLS.add},
    delete: {method: METHODS.DELETE, url: FIXTURE_URLS.delete}
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            id: row.id,
            competitionName: row.competition.name,
            homeTeamName: row.homeTeam.name,
            awayTeamName: row.awayTeam.name,
            fixtureDate: row.fixtureDate,
            fixtureTime: row.fixtureTime,
            season: row.season,
            round: row.round,
            // not used in fixtureColumnDefs so not displayed in grid but used later when updating changes in fixtures.
            competition: row.competition,
            homeTeam: row.homeTeam,
            awayTeam: row.awayTeam
        }
        newData.push(newRow)
    })
    return newData;
}

export const fixtureData = {
    messages: addMessage(Fixture),
    type: Fixture,
    initialValue: fixtureInitialValue,
    columnDefs: fixtureColumnDefs,
    formColDefs: copyFormColDefs(fixtureColumnDefs), // form column definitions
    gridColDefs: copyGridColDefs(fixtureColumnDefs), // Grid column definitions
    methods: apiRequests,
    dropDown: fixtureDropDown,
    gridLoader: gridLoader
};