import ApiService from "../api/ApiService";

import { PLAYER_URLS } from "../common/globals";

export function getPlayers()          {
        const {data, error, isLoaded } =  ApiService.GetRequest(PLAYER_URLS.list)
        return { data2:data, data, error, isLoaded }
 }
export function getPlayerById(id)     {
        const {data, error, isLoaded } = ApiService.GetRequestTwo(PLAYER_URLS.findById, id)
        return { data2:data, data, error, isLoaded }
 }

export function updatePlayer(player)  {  return ApiService.PostRequest(PLAYER_URLS.update, player)      }
export function addPlayer(player)     {  return ApiService.PutRequest(PLAYER_URLS.add, player)          }
export function deletePlayerById(id)  {  return ApiService.DeleteRequest(PLAYER_URLS.deleteById, id)    }


