import { addEvent, deleteEventById, getEvents, updateEvent } from "../../services/EventService";
import { EVENTS, Event } from "../../common/globals";
import { addMessage } from "../../common/helper";

export const eventColumnDefs = [

];

export const eventInitialValue = {

};

const actions = {
    add: addEvent,
    update : updateEvent,
    deleteById: deleteEventById,
    list: getEvents
};

export const eventData = {
    messages: addMessage(Event),
    type: Event,
    actions: actions,
    entity: EVENTS,
    initialValue: eventInitialValue,
    columnDefs: eventColumnDefs
};