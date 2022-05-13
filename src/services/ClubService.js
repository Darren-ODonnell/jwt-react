import ApiService from "../api/ApiService";

import {CLUB_URLS } from "../common/globals";


export const getClubs = ( ) =>          {
    const {data, error, isLoaded } = ApiService.GetRequest( CLUB_URLS.list )
    return {data2:data, data, error, isLoaded }
}

export const getClubById= ( id ) =>     {
    const {data, error, isLoaded } = ApiService.GetRequestTwo( CLUB_URLS.findById, id )
    return {data2:data, data, error, isLoaded }
}
export const getClubByName = ( name ) =>{
    const {data, error, isLoaded } = ApiService.GetRequestTwo( CLUB_URLS.findByName, name )
    return {data2:data, data, error, isLoaded }
}

export const updateClub = ( club ) =>   {
    return ApiService.PostRequest( CLUB_URLS.update, club )
}
export const addClub = ( club )    =>   {
    return ApiService.PutRequest( CLUB_URLS.add, club )
}
export const deleteClubById = ( id ) => {
    return ApiService.DeleteRequest( CLUB_URLS.deleteById, id )
}