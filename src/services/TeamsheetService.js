import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {TEAMSHEET_FINDBYID, TEAMSHEET_LIST,TEAMSHEET_UPDATE, TEAMSHEET_ADD,  TEAMSHEET_DELETEBYID } from "../common/globals";

export function getTeamsheets()          {  return GetRequest(TEAMSHEET_LIST)                 }
export function getTeamsheetById(id)     {  return GetRequestTwo(TEAMSHEET_FINDBYID, id)      }


export function updateTeamsheet(teamsheet)    {  return PostRequest(TEAMSHEET_UPDATE, teamsheet)        }
export function addTeamsheet(teamsheet)       {  return PutRequest(TEAMSHEET_ADD, teamsheet)            }
export function deleteTeamsheetById(id)  {  return DeleteRequest(TEAMSHEET_DELETEBYID, id)    }