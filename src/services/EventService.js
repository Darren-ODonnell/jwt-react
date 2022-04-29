import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {    EVENT_FINDBYID,          EVENT_LIST,
            EVENT_UPDATE,            EVENT_ADD,            EVENT_DELETEBYID,
        } from "../globals";

export function getEvents()          {  return GetRequest(EVENT_LIST)                 }
export function getEventById(id)     {  return GetRequestTwo(EVENT_FINDBYID, id)      }


export function updateEvent(event)    {  return PostRequest(EVENT_UPDATE, event)        }
export function addEvent(event)       {  return PutRequest(EVENT_ADD, event)            }
export function deleteEventById(id)  {  return DeleteRequest(EVENT_DELETEBYID, id)    }