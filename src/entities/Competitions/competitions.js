import { COMPETITIONS, Competition } from '../../common/globals'
import {
    AddCompetition,
    DeleteCompetitionById,
    GetCompetitions,
    UpdateCompetition,
} from "../../services/CompetitionService";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../../common/helper";


export const competitionColumnDefs = [
    { headerName: 'Competition Name', field: 'name'  , type: 'String' , min: 5, max: 45, required: true},
    { headerName: 'Season'          , field: 'season', type: 'Integer', min: 4, max: 4 , required: true},
];

export const competitionInitialValue = {
    name  : "",
    season: ""
};

const actions = {
    add       : AddCompetition,
    update    : UpdateCompetition,
    deleteById: DeleteCompetitionById,
    list      : GetCompetitions
};

export const competitionData = {
    messages    : addMessage(Competition),
    type        : Competition,
    actions     : actions,
    entity      : COMPETITIONS,
    initialValue: competitionInitialValue,
    columnDefs  : competitionColumnDefs,
    formColDefs : copyFormColDefs( competitionColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( competitionColumnDefs ), // Grid column definitions
};
