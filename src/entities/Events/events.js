import { addEvent, deleteEventById, getEvents, updateEvent } from "../../services/EventService";
import { EVENTS, Event, COMPETITION_URLS, METHODS, EVENT_URLS } from "../../common/globals";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../../common/helper";


export const eventColumnDefs = [
    { headerName: 'Competition Name', field: 'competitionName', type: 'String' , min: 8, max: 60, required: true },
    { headerName: 'Home Team Name'  , field: 'homeTeamName'   , type: 'String' , min: 8, max: 60, required: true  },
    { headerName: 'Away Team Name'  , field: 'awayTeamName'   , type: 'String' , min: 8, max: 60, required: true  },
    { headerName: 'Event Name'      , field: 'season'         , type: 'Integer', min: 4, max: 4 , required: true  },
    { headerName: 'Round'           , field: 'round'          , type: 'Integer', min: 1, max: 20, required: true  },
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
    list      : { method: METHODS.GET   , url: EVENT_URLS.list},
    findById  : { method: METHODS.GET   , url: EVENT_URLS.findById},
    update    : { method: METHODS.POST  , url: EVENT_URLS.update},
    add       : { method: METHODS.PUT   , url: EVENT_URLS.add},
    deleteById: { method: METHODS.DELETE, url: EVENT_URLS.deleteById}
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

const actions = {
    add       : addEvent,
    update    : updateEvent,
    deleteById: deleteEventById,
    list      : getEvents
};

export const eventData = {
    messages    : addMessage(Event),
    type        : Event,
    actions     : actions,
    entity      : EVENTS,
    initialValue: eventInitialValue,
    columnDefs  : eventColumnDefs,
    formColDefs : copyFormColDefs( eventColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( eventColumnDefs ), // Grid column definitions
    methods     : apiRequests,
    gridLoader : gridLoader
};