import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {    LASTNAME_FINDBYID,
            LASTNAME_LIST,
            LASTNAME_FINDBYLASTNAME,
            LASTNAME_UPDATE,
            LASTNAME_ADD,
            LASTNAME_DELETEBYID,
            LASTNAME_FINDIRISH,
            LASTNAME_FINDENGLISH,
        } from "../globals";

export function getLastnames()                  {  return GetRequest(LASTNAME_LIST)                     }
export function getLastnameById(id)             {  return GetRequestTwo(LASTNAME_FINDBYID, id)          }
export function getLastnameIrish(lastname)      {  return GetRequestTwo(LASTNAME_FINDIRISH, lastname)   }
export function getLastnameEnglish(lastname)    {  return GetRequestTwo(LASTNAME_FINDENGLISH, lastname) }
export function getLastnameByLastname(lastname) {  return GetRequestTwo(LASTNAME_FINDBYLASTNAME, lastname) }

export function updateLastname(lastname)        {  return PostRequest(LASTNAME_UPDATE, lastname)        }
export function addLastname(lastname)           {  return PutRequest(LASTNAME_ADD, lastname)            }
export function deleteLastnameById(id)          {  return DeleteRequest(LASTNAME_DELETEBYID, id)        }


