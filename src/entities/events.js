import {Event, METHODS, EVENT_URLS} from "../common/globals";
import {addMessage} from "../common/helper";

export const eventColumnDefs = [
    { headerName: 'Competition Name', field: 'competitionName', type: 'string' , width:150,  },
    { headerName: 'Home Team Name'  , field: 'homeTeamName'   , type: 'string' , width:150,  },
    { headerName: 'Away Team Name'  , field: 'awayTeamName'   , type: 'string' , width:150,  },
    { headerName: 'Event Name'      , field: 'season'         , type: 'integer', width:150,  },
    { headerName: 'Round'           , field: 'round'          , type: 'integer', width:150,  },
];

export const eventInitialValue = {
    competitionId: "",
    homeTeamId   : "",
    awayTeamId   : "",
    fixtureDate  : "",
    fixtureTime  : "",
    season       : "",
    round        : ""
};

const apiRequests = {
    list: {method: METHODS.GET, url: EVENT_URLS.list},
    findById: {method: METHODS.GET, url: EVENT_URLS.findById},
    update: {method: METHODS.POST, url: EVENT_URLS.update},
    add: {method: METHODS.PUT, url: EVENT_URLS.add},
    delete: {method: METHODS.DELETE, url: EVENT_URLS.delete}
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {id:row.id,
            competitionName:row.fixture.competition.name,
            homeTeamName:row.fixture.homeTeam.name,
            awayTeamName:row.fixture.awayTeam.name,
            round:row.fixture.round,
            eventName:row.event.name
        }
        newData.push(newRow)
    })
    return newData;
}


export const eventData = {
    messages: addMessage(Event),
    type: Event,
    initialValue: eventInitialValue,
    columnDefs: eventColumnDefs,
    formColDefs: eventColumnDefs, // form column definitions
    gridColDefs: eventColumnDefs, // Grid column definitions
    methods: apiRequests,
    gridLoader: gridLoader
};



