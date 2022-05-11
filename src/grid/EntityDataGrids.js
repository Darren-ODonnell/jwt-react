import React from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './MyDataGrid.css'
import MyDataGrid from "./MyDataGrid";
import { copyFormColDefs, copyGridColDefs } from "../common/helper";

import { Club, Competition, Firstname, Fixture, Lastname, Player, Event, Teamsheet } from "../common/globals";
import { competitionData } from "../entities/Competitions/competitions";
import { fixtureData } from "../entities/Fixtures/fixtures";
import { firstnameData } from "../entities/Firstnames/firstnames";
import { lastnameData } from "../entities/Lastnames/lastnames";
import { playerData } from "../entities/Players/players";
import { eventData } from "../entities/Events/events";
import { teamsheetData } from "../entities/Teamsheets/teamsheets";
import { clubData } from "../entities/Clubs/clubs";

export const EntityDataGrid = ({entity}) => {
    let data = {}
    switch (entity) {
        case Club       : data = clubData; break;
        case Player     : data = playerData; break;
        case Competition: data = competitionData; break;
        case Fixture    : data = fixtureData; break;
        case Event      : data = eventData; break;
        case Firstname  : data = firstnameData; break;
        case Lastname   : data = lastnameData; break;
        case Teamsheet  : data = teamsheetData; break;
        default:
            break;
    }
    return MainDataGrid(data);
}

export const MainDataGrid = ({columnDefs, initialValue, actions, messages, editForm, addForm}) => {
    return (
        <>
            <MyDataGrid
                formColDefs  = { copyFormColDefs( columnDefs )} // form column definitions
                gridColDefs  = { copyGridColDefs( columnDefs )} // Grid column definitions
                initialValue = { initialValue }                 // empty values
                actions      = { actions }                      // endpoint calls
                messages     = { messages }
                editForm     = { editForm }
                addForm      = { addForm }
            />
        </>
    )
}

// export const MainDataGrid2 = (props) => {
export const MainDataGrid2 = ({columnDefs, initialValue, actions, messages}) => {
    return (
        <>
            <MyDataGrid
                formColDefs  = { copyFormColDefs( columnDefs )} // form column definitions
                gridColDefs  = { copyGridColDefs( columnDefs )} // Grid column definitions
                initialValue = { initialValue }                 // empty values
                actions      = { actions }                      // endpoint calls
                messages     = { messages }
            />
        </>
    )
}
