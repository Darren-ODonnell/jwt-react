import ApiService from "../api/ApiService";

import { LASTNAME_URLS } from "../common/globals";

export function getLastnames()                  {
    const {data, error, isLoaded } = ApiService.GetRequest(LASTNAME_URLS.list)
    return { data2:data, data, error, isLoaded }
}
export function getLastnameById(id)             {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(LASTNAME_URLS.findById, id)
    return { data2:data, data, error, isLoaded }
}
export function getLastnameIrish(lastname)      {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(LASTNAME_URLS.findIrish, lastname)
    return { data2:data, data, error, isLoaded }
}
export function getLastnameEnglish(lastname)    {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(LASTNAME_URLS.findEnglish, lastname)
    return { data2:data, data, error, isLoaded }
}
export function getLastnameByLastname(lastname) {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(LASTNAME_URLS.findByLastname, lastname)
    return { data2:data, data, error, isLoaded }
 }

export function updateLastname(lastname)        {  return ApiService.PostRequest(LASTNAME_URLS.update, lastname)        }
export function addLastname(lastname)           {  return ApiService.PutRequest(LASTNAME_URLS.add, lastname)            }
export function deleteLastnameById(id)          {  return ApiService.DeleteRequest(LASTNAME_URLS.deleteById, id)        }


