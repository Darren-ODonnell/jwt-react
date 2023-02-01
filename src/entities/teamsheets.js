import { METHODS } from "../common/globals";

import {addMessage} from "../common/helper";
import {CLUB_URLS} from "./clubs";
import { COMPETITION_URLS } from "./competitions";
import { PLAYER_URLS } from "./players";


export const Teamsheet = 'Teamsheet'

export const teamsheetColumnDefs = [
    {headerName: 'Competition Name', field: 'competitionName', type: 'string'  , width: 150, },
    {headerName: 'Fixture Date'    , field: 'fixtureDate'    , type: 'date'    , width: 150, },
    {headerName: 'Home Team Name'  , field: 'homeTeamName'   , type: 'string'  , width: 150, },
    {headerName: 'Away Team Name'  , field: 'awayTeamName'   , type: 'string'  , width: 150, },
    {headerName: 'Player Name'     , field: 'playerName'     , type: 'string'  , width: 150, },
    {headerName: 'Position'        , field: 'position'       , type: 'string'  , width: 150, },
    {headerName: 'Position Number' , field: 'positionNumber' , type: 'integer',  width: 150, },


];

export const teamsheetInitialValue = {
    competitionName: "",
    homeTeamName   : "",
    awayTeamName   : "",
    firstname      : "",
    lastname       : "",
    position       : "",
};

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            id             : row.id,
            competitionName: row.fixture.competition.name,
            fixtureDate    : row.fixture.fixtureDate,
            homeTeamName   : row.fixture.homeTeam.name,
            awayTeamName   : row.fixture.awayTeam.name,
            playerName     : row.player.firstname + " " + row.player.lastname,
            position       : row.position.name,
            positionNumber : row.position.id,
            // not used in teamsheetColumnDefs so not displayed in grid but used later when updating changes in teamsheet.
            competition    : row.competition,
            homeTeam       : row.homeTeam,
            awayTeam       : row.awayTeam,
            getPlayers     : row.player,
        }
        newData.push(newRow)
    })
    return newData;
}

// teamsheets
const TEAMSHEET_ADD      = "/teamsheet/add";
const TEAMSHEET_DELETE   = "/teamsheet/delete/";
const TEAMSHEET_FINDBYID = "/teamsheet/findById/";
const TEAMSHEET_LIST     = "/teamsheet/list";
const TEAMSHEET_UPDATE   = "/teamsheet/update";

export const TEAMSHEET_URLS = {
    add     : TEAMSHEET_ADD,
    delete  : TEAMSHEET_DELETE,
    findById: TEAMSHEET_FINDBYID,
    list    : TEAMSHEET_LIST,
    update  : TEAMSHEET_UPDATE,
}

const apiRequests = {
    list           : {method: METHODS.GET   , url: TEAMSHEET_URLS.list},
    findById       : {method: METHODS.GET   , url: TEAMSHEET_URLS.findById},
    update         : {method: METHODS.POST  , url: TEAMSHEET_URLS.update},
    add            : {method: METHODS.PUT   , url: TEAMSHEET_URLS.add},
    delete         : {method: METHODS.DELETE, url: TEAMSHEET_URLS.delete},
    getCompetitions: {method: METHODS.GET   , url: COMPETITION_URLS.list},
    getClubs       : {method: METHODS.GET   , url: CLUB_URLS.list},
    getPlayers     : {method: METHODS.GET   , url: PLAYER_URLS.list},
}

export const teamsheetData = {
    messages: addMessage(Teamsheet),
    type: Teamsheet,
    initialValue: teamsheetInitialValue,
    columnDefs: teamsheetColumnDefs,
    // formColDefs : copyFormColDefs( teamsheetColumnDefs ),          // form column definitions
    // gridColDefs : copyGridColDefs( teamsheetColumnDefs  , table ), // Grid column definitions
    formColDefs: teamsheetColumnDefs,          // form column definitions
    gridColDefs: teamsheetColumnDefs, // Grid column definitions
    methods: apiRequests,
    gridLoader: gridLoader
};