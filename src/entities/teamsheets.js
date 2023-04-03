import {METHODS} from "../common/globals";
import {useCallback} from 'react'
import {addMessage} from "../common/helper";
import {CLUB_URLS} from "./clubs";
import { COMPETITION_URLS } from "./competitions";
import { PLAYER_URLS } from "./players";

export const Teamsheet = 'Teamsheet'

export const teamsheetColumnDefs = [
    {headerName: 'Competition Name', field: 'competitionName', width: 150,},
    {headerName: 'Fixture Date', field: 'fixtureDate', width: 150,},
    {headerName: 'Home Team Name', field: 'homeTeamName', width: 150,},
    {headerName: 'Away Team Name', field: 'awayTeamName', width: 150,},
    {headerName: 'Player Name', field: 'playerName', width: 150,},
    {headerName: 'Position', field: 'position', width: 150,},
    {headerName: 'Position Number', field: 'positionNumber', width: 150,},
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
        const newRow = {
            id: row.id,
            competitionName: row.fixture.competition.name,
            fixtureDate: row.fixture.fixtureDate,
            homeTeamName: row.fixture.homeTeam.name,
            awayTeamName: row.fixture.awayTeam.name,
            playerName: row.player.firstname  + " " + row.player.lastname,
            position: row.position.name,
            positionNumber: row.position.id,
            // not used in teamsheetColumnDefs so not displayed in grid but used later when updating/printing changes in teamsheet.
            lastnameFirstname:  row.player.lastname + ", " + row.player.firstname,
            competition: row.competition,
            homeTeam: row.homeTeam,
            awayTeam: row.awayTeam,
            getPlayers: row.player,
            competitionIrishName: row.fixture.competition.irishName,
            homeTeamIrishName: row.fixture.homeTeam.irishName,
            awayTeamIrishName: row.fixture.awayTeam.irishName,
            playerIrishName: row.player.firstnameI + " " + row.player.lastnameI,
            teamsheetEntry: {
                number: row.position.id,
                name: row.player.firstname + " " + row.player.lastname,
                nameIrish: row.player.firstnameI + " " + row.player.lastnameI,
            },
            fixtureEntry: {
                competitionName: row.fixture.competition.name,
                competitionIrishName: row.fixture.competition.irishName,
                homeTeamName: row.fixture.homeTeam.name,
                homeTeamIrishName: row.fixture.homeTeam.irishName,
                awayTeamName: row.fixture.awayTeam.name,
                awayTeamIrishName: row.fixture.awayTeam.irishName,
                club: 'Naomh Jude',
                county: 'Dublin',
                fixtureDate: row.fixture.fixtureDate,
            }
        }
        newData.push(newRow)
    })
    return newData;
}

// teamsheets
const TEAMSHEET_ADD      = "/teamsheet/add";
const TEAMSHEET_DELETE   = "/teamsheet/delete/";
const TEAMSHEET_FINDBYID = "/teamsheet/findById/";
const TEAMSHEET_FINDBYFIXTUREID = "/teamsheet/findByFixtureId/";
const TEAMSHEET_LIST     = "/teamsheet/list";
const TEAMSHEET_UPDATE = "/teamsheet/update";
const TEAMSHEET_LAST = "/teamsheet/last";

export const TEAMSHEET_URLS = {
    add: TEAMSHEET_ADD,
    delete: TEAMSHEET_DELETE,
    findById: TEAMSHEET_FINDBYID,
    findByFixtureId: TEAMSHEET_FINDBYFIXTUREID,
    list: TEAMSHEET_LIST,
    update: TEAMSHEET_UPDATE,
    last: TEAMSHEET_LAST,
}

const apiRequests = {
    list: {method: METHODS.GET, url: TEAMSHEET_URLS.list},
    findById: {method: METHODS.GET, url: TEAMSHEET_URLS.findById},
    findByFixtureIdId: {method: METHODS.GET, url: TEAMSHEET_URLS.findByFixtureId},
    update: {method: METHODS.POST, url: TEAMSHEET_URLS.update},
    add: {method: METHODS.PUT, url: TEAMSHEET_URLS.add},
    delete: {method: METHODS.DELETE, url: TEAMSHEET_URLS.delete},
    getCompetitions: {method: METHODS.GET, url: COMPETITION_URLS.list},
    getClubs: {method: METHODS.GET, url: CLUB_URLS.list},
    getPlayers: {method: METHODS.GET, url: PLAYER_URLS.list},
    getLastTeamsheet: {method: METHODS.GET, url: TEAMSHEET_URLS.last},
}

export const teamsheetData = {
    messages: addMessage(Teamsheet),
    type: Teamsheet,
    initialValue: teamsheetInitialValue,
    columnDefs: teamsheetColumnDefs,
    methods: apiRequests,
    gridLoader: gridLoader
};

export const loadDataForTeamsheet = (filteredData) => {
    let header = {}
    let team = []
    let subs = []
    let footer = {}

    header = {...filteredData[0].fixtureEntry}

    filteredData.map(player => {
        if (player.positionNumber <= 15)
            team.push(player)
        else
            subs.push(player)
    })

    footer = [
        {role: 'Manager', name: "Doni Fox", nameIrish: "Dónal Mac Saoir"},
        {role: 'Assistant Manager', name: "Marion O'Donnell", nameIrish: "Máirín Ní Dhomhnaill"},
        {role: 'Assistant Manager', name: "Pio McCarthy", nameIrish: "Pío Mac Carthaigh"},
        {role: 'Assistant Manager', name: "Ger McManus", nameIrish: "Gearóid Mac Mánus"},
        {role: 'Assistant Manager', name: "Podge Griffin", nameIrish: "Pádraig Criomhthann"},
    ]

    const data = {
        header: header,
        team: team,
        subs: subs,
        footer: footer,
    }
    return data
}
