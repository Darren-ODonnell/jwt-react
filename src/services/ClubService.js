import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {    CLUB_FINDBYID,          CLUB_LIST,           CLUB_FINDBYNAME,
            CLUB_UPDATE,            CLUB_ADD,            CLUB_DELETEBYID,
        } from "../common/globals";

export const getClubs = ( ) =>          {  return GetRequest( CLUB_LIST )                 }
export const getClubById= ( id ) =>     {  return GetRequestTwo( CLUB_FINDBYID, id )      }
export const getClubByName = ( name ) =>{  return GetRequestTwo( CLUB_FINDBYNAME, name )  }

export const updateClub = ( club ) =>   {  return PostRequest( CLUB_UPDATE, club )        }
export const addClub = ( club )    =>   {  return PutRequest( CLUB_ADD, club )            }
export const deleteClubById = ( id ) => {  return DeleteRequest( CLUB_DELETEBYID, id )    }