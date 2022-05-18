import ApiService from "../api/ApiService";
import { API_TYPE, COMPETITION_URLS } from "../common/globals";




export function GetCompetitions( )           {
    const {data, error, isLoaded } = ApiService.useApiRequest(COMPETITION_URLS.list, API_TYPE.GET)
    return {data2:data, data, error, isLoaded }
}
export function GetCompetitionById( id )      {
    const {data, error, isLoaded } = ApiService.useApiRequest(COMPETITION_URLS.findById, id, API_TYPE.GET)
    return { data2:data, data, error, isLoaded }
}
export function GetCompetitionByName( name )  {
    const {data, error, isLoaded } = ApiService.useApiRequest(COMPETITION_URLS.findByName, name, API_TYPE.GET)
    return { data2:data, data, error, isLoaded }
}
export function UpdateCompetition( competition ) {
    const { data, error, isLoaded } = ApiService.useApiRequest(COMPETITION_URLS.update, competition, API_TYPE.POST )
    return { data2:data, data, error, isLoaded }
}
export function AddCompetition(competition) {
    const {data, error, isLoaded } =  ApiService.useApiRequest(COMPETITION_URLS.add, competition, API_TYPE.PUT)
    return { data2:data, data, error, isLoaded }
}
export function DeleteCompetitionById(id)   {
    const {data, error, isLoaded } =  ApiService.useApiRequest(COMPETITION_URLS.deleteById, id, API_TYPE.DELETE)
    return { data2:data, data, error, isLoaded }
}
