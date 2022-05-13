import ApiService from "../api/ApiService";

import { EVENT_URLS } from "../common/globals";

export function getEvents()          {
    const {data, error, isLoaded} = ApiService.GetRequest(EVENT_URLS.list)
    return {data2: data, data, error, isLoaded};
}
export function getEventById(id)     {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(EVENT_URLS.findById, id)
    return {data2: buildData(data), data, error, isLoaded};
}


export function updateEvent(event)    {  return ApiService.PostRequest(EVENT_URLS.update, event)        }
export function addEvent(event)       {  return ApiService.PutRequest(EVENT_URLS.add, event)            }
export function deleteEventById(id)  {  return ApiService.DeleteRequest(EVENT_URLS.deleteById, id)    }


const buildData = () => {

}