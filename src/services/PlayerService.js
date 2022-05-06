import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {
        PLAYER_FINDBYID,
        PLAYER_LIST,
        PLAYER_UPDATE,
        PLAYER_ADD,
        PLAYER_DELETEBYID,
} from "../common/globals";

export function getPlayers()          {
        const {data, error, isLoaded } =  GetRequest(PLAYER_LIST)
        return { data2:data, data, error, isLoaded }
 }
export function getPlayerById(id)     {
        const {data, error, isLoaded } = GetRequestTwo(PLAYER_FINDBYID, id)
        return { data2:data, data, error, isLoaded }
 }

export function updatePlayer(player)  {  return PostRequest(PLAYER_UPDATE, player)      }
export function addPlayer(player)     {  return PutRequest(PLAYER_ADD, player)          }
export function deletePlayerById(id)  {  return DeleteRequest(PLAYER_DELETEBYID, id)    }


