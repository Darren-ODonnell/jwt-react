import { Teamsheet, TEAMSHEET_URLS, METHODS } from "../common/globals";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

export const teamsheetColumnDefs = [
    { headerName: 'Competition Name', field: 'competitionName', type: 'String', min: 8 , max: 60, required: true },
    { headerName: 'Home Team Name'  , field: 'homeTeamName'   , type: 'String', min: 8 , max: 60, required: true },
    { headerName: 'Away Team Name'  , field: 'awayTeamName'   , type: 'String', min: 8 , max: 60, required: true },
    { headerName: 'Firstname'       , field: 'firstname'      , type: 'String', min: -1, max: 1 , required: true },
    { headerName: 'Lastname'        , field: 'lastname'       , type: 'String', min: -1, max: 1 , required: true },
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
        const newRow = {id:row.id,
            competitionName:row.fixture.competition.name,
            homeTeamName:row.fixture.homeTeam.name,
            awayTeamName:row.fixture.awayTeam.name,
            firstname:row.player.firstname,
            lastname:row.player.lastname,
            position:row.position.name,
        }
        newData.push(newRow)
    })
    return newData;
}

const apiRequests = {
    list: {method: METHODS.GET, url: TEAMSHEET_URLS.list},
    findById: {method: METHODS.GET, url: TEAMSHEET_URLS.findById},
    update: {method: METHODS.POST, url: TEAMSHEET_URLS.update},
    add: {method: METHODS.PUT, url: TEAMSHEET_URLS.add},
    delete: {method: METHODS.DELETE, url: TEAMSHEET_URLS.delete}
}

export const teamsheetData = {
    messages    : addMessage(Teamsheet),
    type        : Teamsheet,
    initialValue: teamsheetInitialValue,
    columnDefs  : teamsheetColumnDefs,
    formColDefs : copyFormColDefs( teamsheetColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( teamsheetColumnDefs ), // Grid column definitions
    methods     : apiRequests,
    gridLoader: gridLoader
};