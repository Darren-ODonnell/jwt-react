import { METHODS } from '../common/globals'
import {addMessage, copyFormColDefs, copyGridColDefs} from "../common/helper";


export const Fixture = 'Fixture'

const table = {name:Fixture}

const fixtureColumnDefs = [
    {headerName: 'Competition Name', field: 'competitionName', type: 'string' , width: 120, },
    {headerName: 'Home Team Name'  , field: 'homeTeamName'   , type: 'string' , width: 150, },
    {headerName: 'Away Team Name'  , field: 'awayTeamName'   , type: 'string' , width: 150, },
    {headerName: 'Fixture Date'    , field: 'fixtureDate'    , type: 'date'   , width: 100, },
    {headerName: 'Fixture Time'    , field: 'fixtureTime'    , type: 'time'   , width: 150, },
    {headerName: 'Season'          , field: 'season'         , type: 'integer', width: 120, },
    {headerName: 'Round'           , field: 'round'          , type: 'integer', width: 120, },
];
const fixtureDropDown = true;

const fixtureInitialValue = {
    competitionName: "",
    homeTeamName   : "",
    awayTeamName   : "",
    fixtureDate    : "",
    fixtureTime    : "",
    season         : "",
    round          : ""
};
// fixtures
const FIXTURE_ADD              = "/fixture/add";
const FIXTURE_DELETE           = "/fixture/delete/";
const FIXTURE_FINDBYAWAYBYCLUB = "/fixture/findByAwayByClub/";
const FIXTURE_FINDBYCLUB       = "/fixture/findByClub/";
const FIXTURE_FINDBYHOMEBYCLUB = "/fixture/findByHomeByClub/";
const FIXTURE_FINDBYID         = "/fixture/findById/";
const FIXTURE_FINDNEXTBYCLUB   = "/fixture/findNextByClub/";
const FIXTURE_LIST             = "/fixture/list";
const FIXTURE_UPDATE           = "/fixture/update";

const FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON = "/fixture/findByCompetitionHomeTeamAwayTeamFixtureDateSeason";

const FIXTURE_URLS = {
    add           : FIXTURE_ADD,
    delete        : FIXTURE_DELETE,
    findByAwayClub: FIXTURE_FINDBYAWAYBYCLUB,
    findByHomeClub: FIXTURE_FINDBYHOMEBYCLUB,
    findById      : FIXTURE_FINDBYID,
    findByClub    : FIXTURE_FINDBYCLUB,
    list          : FIXTURE_LIST,
    update        : FIXTURE_UPDATE,
    nextByClub    : FIXTURE_FINDNEXTBYCLUB,

    findByCompetitionHomeTeamAwayTeamFixtureDateSeason: FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON,
}
const apiRequests = {
    list          : {method: METHODS.GET, url: FIXTURE_URLS.list},
    findById      : {method: METHODS.GET, url: FIXTURE_URLS.findById},
    findByClub    : {method: METHODS.GET, url: FIXTURE_URLS.findByClub},
    findByHomeClub: {method: METHODS.GET, url: FIXTURE_URLS.findByHomeClub},
    findByAwayClub: {method: METHODS.GET, url: FIXTURE_URLS.findByAwayClub},
    nextByClub    : {method: METHODS.GET, url: FIXTURE_URLS.nextByClub},

    findByCompetitionHomeTeamAwayTeamFixtureDateSeason: {
        method: METHODS.GET,
        url   : FIXTURE_URLS.findByCompetitionHomeTeamAwayTeamFixtureDateSeason
    },

    update: {method: METHODS.POST  , url: FIXTURE_URLS.update},
    add   : {method: METHODS.PUT   , url: FIXTURE_URLS.add},
    delete: {method: METHODS.DELETE, url: FIXTURE_URLS.delete}

}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            competitionName: row.competition.name,
            homeTeamName: row.homeTeam.name,
            awayTeamName: row.awayTeam.name,
            fixtureDate: row.fixtureDate,
            fixtureTime: row.fixtureTime,
            season: row.season,
            round: row.round,
            // not used in fixtureColumnDefs so not displayed in grid but used later when updating changes in fixtures.
            id: row.id,
            competition: row.competition,
            homeTeam: row.homeTeam,
            awayTeam: row.awayTeam
        }
        newData.push(newRow)
    })
    return newData;
}

export const fixtureData = {
    messages    : addMessage(Fixture),
    type        : Fixture,
    initialValue: fixtureInitialValue,
    columnDefs  : fixtureColumnDefs,
    formColDefs : copyFormColDefs(fixtureColumnDefs), // form column definitions
    gridColDefs : copyGridColDefs(fixtureColumnDefs, table), // Grid column definitions
    methods     : apiRequests,
    dropDown    : fixtureDropDown,
    gridLoader  : gridLoader
};