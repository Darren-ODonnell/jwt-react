import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {    COMPETITION_FINDBYID,
            COMPETITION_LIST,
            COMPETITION_FINDBYNAME,
            COMPETITION_UPDATE,
            COMPETITION_ADD,
            COMPETITION_DELETEBYID,
        } from "../globals";

export function getCompetitions()           {  return GetRequest(COMPETITION_LIST)                  }
export function getCompetitionById(id)      {  return GetRequestTwo(COMPETITION_FINDBYID, id)       }
export function getCompetitionByName(name)  {  return GetRequestTwo(COMPETITION_FINDBYNAME, name)   }

export function updateCompetition(competition) {  return PostRequest(COMPETITION_UPDATE, competition) }
export function addCompetition(competition) {  return PutRequest(COMPETITION_ADD, competition)      }
export function deleteCompetitionById(id)   {  return DeleteRequest(COMPETITION_DELETEBYID, id)     }

