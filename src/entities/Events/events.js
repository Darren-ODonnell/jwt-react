import { addEvent, deleteEventById, getEvents, updateEvent } from "../../services/EventService";
import { EVENTS, Event } from "../../common/globals";
import { addMessage } from "../../common/helper";

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
    columnDefs  : eventColumnDefs
};