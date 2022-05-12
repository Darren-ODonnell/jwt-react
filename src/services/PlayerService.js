import ApiService from "../api/ApiService";

import {
        PLAYER_FINDBYID,
        PLAYER_LIST,
        PLAYER_UPDATE,
        PLAYER_ADD,
        PLAYER_DELETEBYID,
} from "../common/globals";

export function getPlayers()          {
        const {data, error, isLoaded } =  ApiService.GetRequest(PLAYER_LIST)
        return { data2:data, data, error, isLoaded }
 }
export function getPlayerById(id)     {
        const {data, error, isLoaded } = ApiService.GetRequestTwo(PLAYER_FINDBYID, id)
        return { data2:data, data, error, isLoaded }
 }

export function updatePlayer(player)  {  return ApiService.PostRequest(PLAYER_UPDATE, player)      }
export function addPlayer(player)     {  return ApiService.PutRequest(PLAYER_ADD, player)          }
export function deletePlayerById(id)  {  return ApiService.DeleteRequest(PLAYER_DELETEBYID, id)    }


