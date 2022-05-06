import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {
    LASTNAME_FINDBYID,
    LASTNAME_LIST,
    LASTNAME_FINDBYLASTNAME,
    LASTNAME_UPDATE,
    LASTNAME_ADD,
    LASTNAME_DELETEBYID,
    LASTNAME_FINDIRISH,
    LASTNAME_FINDENGLISH,
} from "../common/globals";

export function getLastnames()                  {
    const {data, error, isLoaded } = GetRequest(LASTNAME_LIST)
    return { data2:data, data, error, isLoaded }
}
export function getLastnameById(id)             {
    const {data, error, isLoaded } = GetRequestTwo(LASTNAME_FINDBYID, id)
    return { data2:data, data, error, isLoaded }
}
export function getLastnameIrish(lastname)      {
    const {data, error, isLoaded } = GetRequestTwo(LASTNAME_FINDIRISH, lastname)
    return { data2:data, data, error, isLoaded }
}
export function getLastnameEnglish(lastname)    {
    const {data, error, isLoaded } = GetRequestTwo(LASTNAME_FINDENGLISH, lastname)
    return { data2:data, data, error, isLoaded }
}
export function getLastnameByLastname(lastname) {
    const {data, error, isLoaded } = GetRequestTwo(LASTNAME_FINDBYLASTNAME, lastname)
    return { data2:data, data, error, isLoaded }
 }

export function updateLastname(lastname)        {  return PostRequest(LASTNAME_UPDATE, lastname)        }
export function addLastname(lastname)           {  return PutRequest(LASTNAME_ADD, lastname)            }
export function deleteLastnameById(id)          {  return DeleteRequest(LASTNAME_DELETEBYID, id)        }


