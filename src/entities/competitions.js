import {Competition, COMPETITION_URLS, METHODS} from '../common/globals'
import {addMessage, copyFormColDefs, copyGridColDefs} from "../common/helper";
import {TextField} from "@mui/material";
import React from "react";

export const competitionColumnDefs = [
    {headerName: 'Competition Name', field: 'name', type: 'String', min: 5, max: 45, required: true},
    {headerName: 'Season', field: 'season', type: 'Integer', min: 4, max: 4, required: true},
];
export const competitionInitialValue = {
    name: "",
    season: ""
};
const apiRequests = {
    list      : { method: METHODS.GET   , url: COMPETITION_URLS.list },
    findById  : { method: METHODS.GET   , url: COMPETITION_URLS.findById },
    findByName: { method: METHODS.GET   , url: COMPETITION_URLS.findByName },
    update    : { method: METHODS.POST  , url: COMPETITION_URLS.update },
    add       : { method: METHODS.PUT   , url: COMPETITION_URLS.add },
    delete: {method: METHODS.DELETE, url: COMPETITION_URLS.delete}
}
const gridLoader = ( data ) => {
    return data;
}
export const competitionData = {
    messages: addMessage(Competition),
    type: Competition,
    initialValue: competitionInitialValue,
    columnDefs: competitionColumnDefs,
    formColDefs: copyFormColDefs(competitionColumnDefs), // form column definitions
    gridColDefs: copyGridColDefs(competitionColumnDefs), // Grid column definitions
    methods: apiRequests,
    gridLoader: gridLoader
};

const textField = ({index, field, formData, onChange, headerName}) => {
    return (
        <TextField
            key={index}
            id={field}
            value={formData[field]}
            onChange={e => onChange(e)}
            data={formData}
            placeholder={"Enter " + headerName}
            label={headerName}
            variant="outlined"
            margin="dense"
            fullWidth
        />
    )
}

const formLayout = {}





