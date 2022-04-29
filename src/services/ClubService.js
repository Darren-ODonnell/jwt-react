import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {    CLUB_FINDBYID,          CLUB_LIST,           CLUB_FINDBYNAME,
            CLUB_UPDATE,            CLUB_ADD,            CLUB_DELETEBYID,
        } from "../globals";

export function getClubs()          {  return GetRequest(CLUB_LIST)                 }
export function getClubById(id)     {  return GetRequestTwo(CLUB_FINDBYID, id)      }
export function getClubByName(name) {  return GetRequestTwo(CLUB_FINDBYNAME, name)  }

export function updateClub(club)    {  return PostRequest(CLUB_UPDATE, club)        }
export function addClub(club)       {  return PutRequest(CLUB_ADD, club)            }
export function deleteClubById(id)  {  return DeleteRequest(CLUB_DELETEBYID, id)    }