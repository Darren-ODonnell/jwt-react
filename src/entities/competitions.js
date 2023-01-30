import { METHODS } from '../common/globals'
import {addMessage, copyFormColDefs, copyGridColDefs} from "../common/helper";
import {TextField} from "@mui/material";
import React from "react";

export const Competition = 'Competition'
const table = {name : Competition}

export const competitionColumnDefs = [
    {headerName: 'Competition Name', field: 'name', type: 'String', width:200, },
    {headerName: 'Season', field: 'season', type: 'Integer', width:150, },
];
export const competitionInitialValue = {
    name: "",
    season: ""
};

const COMPETITION_ADD        = "/competition/add";
const COMPETITION_DELETE     = "/competition/delete";
const COMPETITION_FINDBYID   = "/competition/findById/";
const COMPETITION_FINDBYNAME = "/competition/findByName/";
const COMPETITION_LIST       = "/competition/list";
const COMPETITION_UPDATE     = "/competition/update";

export const COMPETITION_URLS = {
    add       : COMPETITION_ADD,
    delete    : COMPETITION_DELETE,
    findByName: COMPETITION_FINDBYNAME,
    findById  : COMPETITION_FINDBYID,
    list      : COMPETITION_LIST,
    update    : COMPETITION_UPDATE,
}

const apiRequests = {
    list      : {method: METHODS.GET   , url: COMPETITION_URLS.list},
    findById  : {method: METHODS.GET   , url: COMPETITION_URLS.findById},
    findByName: {method: METHODS.GET   , url: COMPETITION_URLS.findByName},
    update    : {method: METHODS.POST  , url: COMPETITION_URLS.update},
    add       : {method: METHODS.PUT   , url: COMPETITION_URLS.add},
    delete    : {method: METHODS.DELETE, url: COMPETITION_URLS.delete}
}
const gridLoader = (data) => {
    return data;
}



export const competitionData = {
    messages: addMessage(Competition),
    type: Competition,
    initialValue: competitionInitialValue,
    columnDefs: competitionColumnDefs,
    formColDefs: copyFormColDefs(competitionColumnDefs), // form column definitions
    gridColDefs: copyGridColDefs(competitionColumnDefs, table), // Grid column definitions
    methods: apiRequests,
    gridLoader: gridLoader
};







