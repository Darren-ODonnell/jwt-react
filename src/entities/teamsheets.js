import { Teamsheet, TEAMSHEET_URLS, METHODS, COMPETITION_URLS, CLUB_URLS, PLAYER_URLS} from "../common/globals";
import {addMessage, copyFormColDefs, copyGridColDefs} from "../common/helper";

const table = {name:Teamsheet}

export const teamsheetColumnDefs = [
    { headerName: 'Competition Name', field: 'competitionName', type: 'String', min: 8 , max: 60, required: true },
    { headerName: 'Home Team Name'  , field: 'homeTeamName'   , type: 'String', min: 8 , max: 60, required: true },
    { headerName: 'Away Team Name'  , field: 'awayTeamName'   , type: 'String', min: 8 , max: 60, required: true },
    { headerName: 'Player Name'       , field: 'playerName'      , type: 'String', min: -1, max: 1 , required: true },
    // { headerName: 'Lastname'        , field: 'lastname'       , type: 'String', min: -1, max: 1 , required: true },
    { headerName: 'Position'        , field: 'position'       , type: 'String', min: -1, max: 1 , required: true },

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
            homeTeamName   : row.fixture.homeTeam.name,
            awayTeamName   : row.fixture.awayTeam.name,
            playerName     : row.player.firstname + " " + row.player.lastname,
            // lastname       : row.player.lastname,
            position       : row.position.name,
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