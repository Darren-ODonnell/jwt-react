import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {    FIRSTNAME_FINDBYID,
            FIRSTNAME_LIST,
            FIRSTNAME_FINDBYFIRSTNAME,
            FIRSTNAME_UPDATE,
            FIRSTNAME_ADD,
            FIRSTNAME_DELETEBYID,
            FIRSTNAME_FINDIRISH,
            FIRSTNAME_FINDENGLISH,
        } from "../common/globals";

export function getFirstnames()                 {  return GetRequest(FIRSTNAME_LIST)                   }
export function getFirstnameById(id)            {  return GetRequestTwo(FIRSTNAME_FINDBYID, id)           }
export function getFirstnameIrish(firstname)    {  return GetRequestTwo(FIRSTNAME_FINDIRISH, firstname)   }
export function getFirstnameEnglish(firstname)  {  return GetRequestTwo(FIRSTNAME_FINDENGLISH, firstname) }
export function getFirstnameByFirstname(firstname) {  return GetRequestTwo(FIRSTNAME_FINDBYFIRSTNAME, firstname) }

export function updateFirstname(firstname)      {  return PostRequest(FIRSTNAME_UPDATE, firstname)        }
export function addFirstname(firstname)         {  return PutRequest(FIRSTNAME_ADD, firstname)            }
export function deleteFirstnameById(id)         {  return DeleteRequest(FIRSTNAME_DELETEBYID, id)         }


