import { FIXTURES, Fixture, COMPETITION_URLS, METHODS, FIXTURE_URLS } from '../../common/globals'
import {addFixture, deleteFixtureById, getFixtures, updateFixture} from "../../services/FixtureService";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../../common/helper";


export const fixtureColumnDefs = [
    { headerName: 'Competition Name', field: 'competitionName',type: 'String' , min: 8 , max: 60, required: true },
    { headerName: 'Home Team Name'  , field: 'homeTeamName'   ,type: 'String' , min: 8 , max: 60, required: true  },
    { headerName: 'Away Team Name'  , field: 'awayTeamName'   ,type: 'String' , min: 8 , max: 60, required: true  },
    { headerName: 'Fixture Date'    , field: 'fixtureDate'    ,type: 'Date'   , min: -1, max: 1 , required: true  },
    { headerName: 'Fixture Time'    , field: 'fixtureTime'    ,type: 'Time'   , min: 0 , max: 24, required: true  },
    { headerName: 'Season'          , field: 'season'         ,type: 'Integer', min: 4 , max: 4 , required: true  },
    { headerName: 'Round'           , field: 'round'          ,type: 'Integer', min: 1 , max: 20, required: true  },
];

export const fixtureInitialValue = {
    competitionName: "",
    homeTeamName   : "",
    awayTeamName   : "",
    fixtureDate    : "",
    fixtureTime    : "",
    season         : "",
    round          : ""
};

const apiRequests = {
    list          : { method: METHODS.GET, url: FIXTURE_URLS.list},
    findById      : { method: METHODS.GET, url: FIXTURE_URLS.findById},
    findByClub    : { method: METHODS.GET, url: FIXTURE_URLS.findByClub},
    findByHomeClub: { method: METHODS.GET, url: FIXTURE_URLS.findByHomeClub},
    findByAwayClub: { method: METHODS.GET, url: FIXTURE_URLS.findByAwayClub},
    nextByClub    : { method: METHODS.GET, url: FIXTURE_URLS.nextByClub},

    findByCompetitionHomeTeamAwayTeamFixtureDateSeason: { method: METHODS.GET, url: FIXTURE_URLS.findByCompetitionHomeTeamAwayTeamFixtureDateSeason},

    update    : { method: METHODS.POST  , url: FIXTURE_URLS.update},
    add       : { method: METHODS.PUT   , url: FIXTURE_URLS.add},
    deleteById: { method: METHODS.DELETE, url: FIXTURE_URLS.deleteById}
}
const actions = {
    add       : addFixture,
    update    : updateFixture,
    deleteById: deleteFixtureById,
    list      : getFixtures,
};

const gridLoader = (data) => {
    let newData = [];

    data.forEach(row => {
        const newRow = {id:row.id,
            competitionName:row.competition.name,
            homeTeamName:row.homeTeam.name,
            awayTeamName:row.awayTeam.name,
            fixtureDate:row.fixtureDate,
            fixtureTime:row.fixtureTime,
            season:row.season,
            round:row.round
        }
        newData.push(newRow)
    })
    return newData;
}



export const fixtureData = {
    messages    : addMessage(Fixture),
    type        : Fixture,
    actions     : actions,
    entity      : FIXTURES,
    initialValue: fixtureInitialValue,
    columnDefs  : fixtureColumnDefs,
    formColDefs : copyFormColDefs( fixtureColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( fixtureColumnDefs ), // Grid column definitions
    methods     : apiRequests,
    gridLoader  : gridLoader

};



