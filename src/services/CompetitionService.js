import ApiService from "../api/ApiService";
import { API_TYPE, COMPETITION_URLS } from "../common/globals";




export function GetCompetitions( )           {
    // const {data, error, loading } = ApiService.useResource(COMPETITION_URLS.list, API_TYPE.GET)
    // return {data2:data, data, error, loading }
}


export function GetCompetitions2( )           {
    // const {data, error, loading } = ApiService.useApiRequest(COMPETITION_URLS.list, API_TYPE.GET)
    // return {data2:data, data, error, loading }
}
export function GetCompetitionById( id )      {
    // const {data, error, loading } = ApiService.useApiRequest(COMPETITION_URLS.findById, id, API_TYPE.GET)
    // return { data2:data, data, error, loading }
}
export function GetCompetitionByName( name )  {
    // const {data, error, loading } = ApiService.useApiRequest(COMPETITION_URLS.findByName, name, API_TYPE.GET)
    // return { data2:data, data, error, loading }
}
export function UpdateCompetition( competition ) {
    // const { data, error, loading } = ApiService.useApiRequest(COMPETITION_URLS.update, competition, API_TYPE.POST )
    // return { data2:data, data, error, loading }
}
export function AddCompetition(competition) {
    // const {data, error, loading } =  ApiService.useResource(COMPETITION_URLS.add, competition, API_TYPE.PUT)
    // return { data2:data, data, error, loading }
}
export function DeleteCompetitionById(id)   {
    // const {data, error, loading } =  ApiService.useApiRequest(COMPETITION_URLS.deleteById, id, API_TYPE.DELETE)
    // return { data2:data, data, error, loading }
}
