import ApiService from "../api/ApiService";

import { FIRSTNAME_URLS } from "../common/globals";

export function getFirstnames()                 {
    const {data, error, isLoaded } = ApiService.GetRequest(FIRSTNAME_URLS.list)
    return { data2:data, data, error, isLoaded }
}
export function getFirstnameById(id)            {
    const {data, error, isLoaded } =  ApiService.GetRequestTwo(FIRSTNAME_URLS.findById, id)
    return { data2:data, data, error, isLoaded }
 }
export function getFirstnameIrish(firstname)    {
    const {data, error, isLoaded } =  ApiService.GetRequestTwo(FIRSTNAME_URLS.findById, firstname)
    return { data2:data, data, error, isLoaded }
 }
export function getFirstnameEnglish(firstname)  {
    const {data, error, isLoaded } =  ApiService.GetRequestTwo(FIRSTNAME_URLS.findEnglish, firstname)
    return { data2:data, data, error, isLoaded }
}
export function getFirstnameByFirstname(firstname) {
    const {data, error, isLoaded } =  ApiService.GetRequestTwo(FIRSTNAME_URLS.findByFirstname, firstname)
    return { data2:data, data, error, isLoaded }
 }

export function updateFirstname(firstname)      {  return ApiService.PostRequest(FIRSTNAME_URLS.update, firstname)  }
export function addFirstname(firstname)         {  return ApiService.PutRequest(FIRSTNAME_URLS.add, firstname)      }
export function deleteFirstnameById(id)         {  return ApiService.DeleteRequest(FIRSTNAME_URLS.deleteById, id)   }


