import React from 'react'
import { COMPETITIONS, Competition } from '../globals'
import { addCompetition, deleteCompetitionById, getCompetitions, updateCompetition } from "../services/CompetitionService";
import { addMessage } from "../generic/helper";

export const competitionColumnDefs = [
    { headerName: 'Competition Name',   field: 'name',   type: 'String',  min:5, max:45, required: true},
    { headerName: 'Season',             field: 'season', type: 'Integer', min:4, max:4,  required: true},
];

export const competitionInitialValue = {
    name:"",
    season:""
};

const actions = {
    add: addCompetition,
    update : updateCompetition,
    deleteById: deleteCompetitionById,
    list: getCompetitions
};

export const competitionData = {
    messages: addMessage(Competition),
    type: Competition,
    actions: actions,
    entity: COMPETITIONS,
    initialValue: competitionInitialValue,
    columnDefs: competitionColumnDefs
};