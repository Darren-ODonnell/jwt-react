import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {
    COMPETITION_FINDBYID,
    COMPETITION_LIST,
    COMPETITION_FINDBYNAME,
    COMPETITION_UPDATE,
    COMPETITION_ADD,
    COMPETITION_DELETEBYID,
} from "../common/globals";

export function getCompetitions()           {
    const {data, error, isLoaded } = GetRequest(COMPETITION_LIST)
    return {data2:data, data, error, isLoaded }
 }
export function getCompetitionById(id)      {
    const {data, error, isLoaded } = GetRequestTwo(COMPETITION_FINDBYID, id)
    return { data2:data, data, error, isLoaded }
 }
export function getCompetitionByName(name)  {
    const {data, error, isLoaded } = GetRequestTwo(COMPETITION_FINDBYNAME, name)
    return { data2:data, data, error, isLoaded }
}

export function updateCompetition(competition) {  return PostRequest(COMPETITION_UPDATE, competition) }
export function addCompetition(competition) {  return PutRequest(COMPETITION_ADD, competition)      }
export function deleteCompetitionById(id)   {  return DeleteRequest(COMPETITION_DELETEBYID, id)     }

