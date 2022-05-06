import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {
    EVENT_FINDBYID, EVENT_LIST,
    EVENT_UPDATE, EVENT_ADD, EVENT_DELETEBYID,
} from "../common/globals";

export function getEvents()          {
    const {data, error, isLoaded} = GetRequest(EVENT_LIST)
    return {data2: data, data, error, isLoaded};
}
export function getEventById(id)     {
    const {data, error, isLoaded } = GetRequestTwo(EVENT_FINDBYID, id)
    return {data2: buildData(data), data, error, isLoaded};
}


export function updateEvent(event)    {  return PostRequest(EVENT_UPDATE, event)        }
export function addEvent(event)       {  return PutRequest(EVENT_ADD, event)            }
export function deleteEventById(id)  {  return DeleteRequest(EVENT_DELETEBYID, id)    }


const buildData = () => {

}