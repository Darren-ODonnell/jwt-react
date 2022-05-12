import ApiService from "../api/ApiService";

import {
    COMPETITION_FINDBYID,
    COMPETITION_LIST,
    COMPETITION_FINDBYNAME,
    COMPETITION_UPDATE,
    COMPETITION_ADD,
    COMPETITION_DELETEBYID,
} from "../common/globals";

export function GetCompetitions( )           {
    const {data, error, isLoaded } = ApiService.GetRequest(COMPETITION_LIST)
    return {data2:data, data, error, isLoaded }
 }
export function GetCompetitionById( id )      {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(COMPETITION_FINDBYID, id)
    return { data2:data, data, error, isLoaded }
 }
export function GetCompetitionByName( name )  {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(COMPETITION_FINDBYNAME, name)
    return { data2:data, data, error, isLoaded }
}

export function UpdateCompetition( competition ) {
    const props = { url: COMPETITION_UPDATE, record: competition }
    const { data, error, isLoaded } = ApiService.AnotherRequest( props )
    return { data2:data, data, error, isLoaded }
}

export function AddCompetition(competition) {  return ApiService.PutRequest(COMPETITION_ADD, competition)      }
export function DeleteCompetitionById(id)   {  return ApiService.DeleteRequest(COMPETITION_DELETEBYID, id)     }

