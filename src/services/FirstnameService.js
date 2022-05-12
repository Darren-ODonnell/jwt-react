import ApiService from "../api/ApiService";

import {
    FIRSTNAME_FINDBYID,
    FIRSTNAME_LIST,
    FIRSTNAME_FINDBYFIRSTNAME,
    FIRSTNAME_UPDATE,
    FIRSTNAME_ADD,
    FIRSTNAME_DELETEBYID,
    FIRSTNAME_FINDIRISH,
    FIRSTNAME_FINDENGLISH,
} from "../common/globals";

export function getFirstnames()                 {
    const {data, error, isLoaded } = ApiService.GetRequest(FIRSTNAME_LIST)
    return { data2:data, data, error, isLoaded }
}
export function getFirstnameById(id)            {
    const {data, error, isLoaded } =  ApiService.GetRequestTwo(FIRSTNAME_FINDBYID, id)
    return { data2:data, data, error, isLoaded }
 }
export function getFirstnameIrish(firstname)    {
    const {data, error, isLoaded } =  ApiService.GetRequestTwo(FIRSTNAME_FINDIRISH, firstname)
    return { data2:data, data, error, isLoaded }
 }
export function getFirstnameEnglish(firstname)  {
    const {data, error, isLoaded } =  ApiService.GetRequestTwo(FIRSTNAME_FINDENGLISH, firstname)
    return { data2:data, data, error, isLoaded }
}
export function getFirstnameByFirstname(firstname) {
    const {data, error, isLoaded } =  ApiService.GetRequestTwo(FIRSTNAME_FINDBYFIRSTNAME, firstname)
    return { data2:data, data, error, isLoaded }
 }

export function updateFirstname(firstname)      {  return ApiService.PostRequest(FIRSTNAME_UPDATE, firstname)        }
export function addFirstname(firstname)         {  return ApiService.PutRequest(FIRSTNAME_ADD, firstname)            }
export function deleteFirstnameById(id)         {  return ApiService.DeleteRequest(FIRSTNAME_DELETEBYID, id)         }


