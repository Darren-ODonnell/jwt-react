import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {
    CLUB_FINDBYID,
    CLUB_LIST,
    CLUB_FINDBYNAME,
    CLUB_UPDATE,
    CLUB_ADD,
    CLUB_DELETEBYID,
} from "../common/globals";


export const getClubs = ( ) =>          {
    const {data, error, isLoaded } = GetRequest( CLUB_LIST )
    return {data2:data, data, error, isLoaded }
}

export const getClubById= ( id ) =>     {
    const {data, error, isLoaded } = GetRequestTwo( CLUB_FINDBYID, id )
    return {data2:data, data, error, isLoaded }
}
export const getClubByName = ( name ) =>{
    const {data, error, isLoaded } = GetRequestTwo( CLUB_FINDBYNAME, name )
    return {data2:data, data, error, isLoaded }
}

export const updateClub = ( club ) =>   {
    return PostRequest( CLUB_UPDATE, club )
}
export const addClub = ( club )    =>   {
    return PutRequest( CLUB_ADD, club )
}
export const deleteClubById = ( id ) => {
    return DeleteRequest( CLUB_DELETEBYID, id )
}