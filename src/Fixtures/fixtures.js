import {  FIXTURES, Fixture } from '../globals'
import { addFixture, deleteFixtureById, getFixtures, updateFixture } from "../services/FixtureService";
import { addMessage } from "../generic/helper";

export const fixtureColumnDefs = [
    { headerName: 'Competition ID', field: 'competitionId',type: 'Integer',  min:1,  max:100000,  required: true },
    { headerName: 'Home Team ID',   field: 'homeTeamId',   type: 'Integer',  min:1,  max:100000,  required: true  },
    { headerName: 'Away Team ID',   field: 'awayTeamId',   type: 'Integer',  min:1,  max:100000,  required: true  },
    { headerName: 'Fixture Date',   field: 'fixtureDate',  type: 'Date' ,    min:-1, max:1,       required: true  },
    { headerName: 'Fixture Time',   field: 'fixtureTime',  type: 'Time',     min:0,  max:24,      required: true  },
    { headerName: 'Season',         field: 'season',       type: 'Integer',  min:4,  max:4,       required: true  },
    { headerName: 'Round',          field: 'round',        type: 'Integer',  min:1,  max:20,      required: true  },
];

export const fixtureInitialValue = {
    competitionId:"",
    homeTeamId:"",
    awayTeamId:"",
    fixtureDate:"",
    fixtureTime:"",
    season:"",
    round:""
};

const actions = {
    add: addFixture,
    update : updateFixture,
    deleteById: deleteFixtureById,
    list: getFixtures
};

export const fixtureData = {
    messages: addMessage(Fixture),
    type: Fixture,
    actions: actions,
    entity: FIXTURES,
    initialValue: fixtureInitialValue,
    columnDefs: fixtureColumnDefs
};