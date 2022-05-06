import { GetRequest, GetRequestTwo, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

import {
    TEAMSHEET_FINDBYID,
    TEAMSHEET_LIST,
    TEAMSHEET_UPDATE,
    TEAMSHEET_ADD,
    TEAMSHEET_DELETEBYID,
} from "../common/globals";

export function getTeamsheets()           {
    const {data, error, isLoaded } = GetRequest(TEAMSHEET_LIST)
    return {data2: buildData(data), data, error, isLoaded};
}
export function getTeamsheetById(id)      {
    const {data, error, isLoaded} = GetRequestTwo(TEAMSHEET_FINDBYID, id)
    return {data2: buildData(data), data, error, isLoaded};
}
export function updateTeamsheet(teamsheet){
    const {data, error, isLoaded} = PostRequest(TEAMSHEET_UPDATE, teamsheet)
    return {data2: buildData(data), data, error, isLoaded};
}
export function addTeamsheet(teamsheet)   {
    const {data, error, isLoaded} = PutRequest(TEAMSHEET_ADD, teamsheet)
    return {data2: buildData(data), data, error, isLoaded};
}
export function deleteTeamsheetById(id)   {
    const {data, error, isLoaded} = DeleteRequest(TEAMSHEET_DELETEBYID, id)
    return {data2: buildData(data), data, error, isLoaded};
}

// display named data rather than IDs in place of Competition, homeTeam and awayTeam and Position
const buildData = data => {
    let newRow  = {}
    let newData = [];

    data.forEach(row => {
        newRow = {
            id             : row.id,
            competitionName: row.fixture.competition.name,
            homeTeamName   : row.fixture.homeTeam.name,
            awayTeamName   : row.fixture.awayTeam.name,
            firstname      : row.player.firstname,
            lastname       : row.player.lastname,
            position       : row.position.name,
        }
        newData.push(newRow);
    });
    return newData;
}