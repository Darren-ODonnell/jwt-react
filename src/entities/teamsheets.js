import { METHODS } from "../common/globals";

import {addMessage, copyFormColDefs, copyGridColDefs} from "../common/helper";
import { CLUB_URLS } from "./clubs";
import { COMPETITION_URLS } from "./competitions";
import { PLAYER_URLS } from "./players";


export const Teamsheet = 'Teamsheet'
const table = {name:Teamsheet}

export const teamsheetColumnDefs = [
    {headerName: 'Competition Name', field: 'competitionName', type: 'String', width:150,  required: true},
    {headerName: 'Fixture Date', field: 'fixtureDate', type: 'Date', width:150,  required: true},
    {headerName: 'Home Team Name', field: 'homeTeamName', type: 'String', width:150,  required: true},
    {headerName: 'Away Team Name', field: 'awayTeamName', type: 'String', width:150,  required: true},
    {headerName: 'Player Name', field: 'playerName', type: 'String', width:150,  required: true},
    // { headerName: 'Lastname'        , field: 'lastname'       , type: 'String', width:150,  required: true },
    {headerName: 'Position', field: 'position', type: 'String', width:150,  required: true},
    {headerName: 'Position Number', field: 'positionNumber', type: 'Position', width:150,  required: true},


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
            id: row.id,
            competitionName: row.fixture.competition.name,
            fixtureDate: row.fixture.fixtureDate,
            homeTeamName: row.fixture.homeTeam.name,
            awayTeamName: row.fixture.awayTeam.name,
            playerName: row.player.firstname + " " + row.player.lastname,
            // lastname       : row.player.lastname,
            position: row.position.name,
            positionNumber: row.position.id,
            // not used in teamsheetColumnDefs so not displayed in grid but used later when updating changes in teamsheet.
            competition: row.competition,
            homeTeam: row.homeTeam,
            awayTeam: row.awayTeam,
            getPlayers: row.player,
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
    messages    : addMessage(Teamsheet),
    type        : Teamsheet,
    initialValue: teamsheetInitialValue,
    columnDefs  : teamsheetColumnDefs,
    formColDefs : copyFormColDefs( teamsheetColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( teamsheetColumnDefs, table ), // Grid column definitions
    methods     : apiRequests,
    gridLoader: gridLoader
};