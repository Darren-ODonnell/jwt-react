import ApiService from "../api/ApiService";

import {COMPETITION_URLS } from "../common/globals";


export function UpdateCompetition( competition ) {
    const props = { url: COMPETITION_URLS.update, record: competition }
    const { data, error, isLoaded } = ApiService.PostRequest( props )
    return { data2:data, data, error, isLoaded }
}


export function GetCompetitions( )           {
    const {data, error, isLoaded } = ApiService.GetRequest(COMPETITION_URLS.list)
    return {data2:data, data, error, isLoaded }
 }
export function GetCompetitionById( id )      {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(COMPETITION_URLS.findById, id)
    return { data2:data, data, error, isLoaded }
 }
export function GetCompetitionByName( name )  {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(COMPETITION_URLS.findByName, name)
    return { data2:data, data, error, isLoaded }
}

export function AddCompetition(competition) {  return ApiService.PutRequest(COMPETITION_URLS.add, competition)      }
export function DeleteCompetitionById(id)   {  return ApiService.DeleteRequest(COMPETITION_URLS.deleteById, id)     }
