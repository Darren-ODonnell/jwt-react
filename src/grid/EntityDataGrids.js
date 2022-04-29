import React from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './MyDataGrid.css'
import MyDataGrid from "./MyDataGrid";
import { copyFormColDefs, copyGridColDefs } from "../generic/helper";

import { Club, Competition, Firstname, Fixture, Lastname, Player, Event, Teamsheet } from "../globals";
import { competitionData } from "../Competitions/competitions";
import { fixtureData } from "../Fixtures/fixtures";
import { firstnameData } from "../Firstnames/firstnames";
import { lastnameData } from "../Lastnames/lastnames";
import { playerData } from "../Players/players";
import { eventData } from "../Events/events";
import { teamsheetData} from "../Teamsheets/teamsheets";
import { clubData } from "../Clubs/clubs";

export const EntityDataGrid = (props) => {
    let data = {}
    switch (props.entity) {
        case Club:          data = clubData; break;
        case Player:        data = playerData; break;
        case Competition:   data = competitionData; break;
        case Fixture:       data = fixtureData; break;
        case Event:         data = eventData; break;
        case Firstname:     data = firstnameData; break;
        case Lastname:      data = lastnameData; break;
        case Teamsheet:     data = teamsheetData; break;
        default:
            break;
    }
    return MainDataGrid(data);
}
export const MainDataGrid = (props) => {
    return (
        <>
            <MyDataGrid
                formColDefs={ copyFormColDefs( props.columnDefs )} // form column definitions
                gridColDefs={ copyGridColDefs( props.columnDefs )} // Grid column definitions
                initialValue={ props.initialValue } // empty values
                actions={ props.actions } // endpoint calls
                messages={ props.messages }
            />
        </>
    )
}



