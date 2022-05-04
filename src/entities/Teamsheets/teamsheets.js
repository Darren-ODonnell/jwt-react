import { addTeamsheet, deleteTeamsheetById, getTeamsheets, updateTeamsheet } from "../../services/TeamsheetService";
import { TEAMSHEETS, Teamsheet } from "../../common/globals";
import { addMessage } from "../../common/helper";

export const teamsheetColumnDefs = [

];

export const teamsheetInitialValue = {

};

const actions = {
    add: addTeamsheet,
    update : updateTeamsheet,
    deleteById: deleteTeamsheetById,
    list: getTeamsheets
}

export const teamsheetData = {
    messages: addMessage(Teamsheet),
    type: Teamsheet,
    actions: actions,
    entity: TEAMSHEETS,
    initialValue: teamsheetInitialValue,
    columnDefs: teamsheetColumnDefs
};