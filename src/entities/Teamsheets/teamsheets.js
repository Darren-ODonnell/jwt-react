import { addTeamsheet, deleteTeamsheetById, getTeamsheets, updateTeamsheet } from "../../services/TeamsheetService";
import { TEAMSHEETS, Teamsheet, TEAMSHEET_URLS, METHODS } from "../../common/globals";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../../common/helper";

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

    return data;
}
const actions = {
    add       : addTeamsheet,
    update    : updateTeamsheet,
    deleteById: deleteTeamsheetById,
    list      : getTeamsheets
}

const apiRequests = {
    list      : { method: METHODS.GET   , url: TEAMSHEET_URLS.list},
    findById  : { method: METHODS.GET   , url: TEAMSHEET_URLS.findById},
    update    : { method: METHODS.POST  , url: TEAMSHEET_URLS.update},
    add       : { method: METHODS.PUT   , url: TEAMSHEET_URLS.add},
    deleteById: { method: METHODS.DELETE, url: TEAMSHEET_URLS.deleteById}
}

export const teamsheetData = {
    messages    : addMessage(Teamsheet),
    type        : Teamsheet,
    actions     : actions,
    entity      : TEAMSHEETS,
    initialValue: teamsheetInitialValue,
    columnDefs  : teamsheetColumnDefs,
    formColDefs : copyFormColDefs( teamsheetColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( teamsheetColumnDefs ), // Grid column definitions
    methods     : apiRequests,
    gridLoader : gridLoader
};