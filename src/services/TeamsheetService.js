import ApiService from "../api/ApiService";

import { TEAMSHEET_URLS } from "../common/globals";

export function getTeamsheets()           {
    const {data, error, isLoaded } = ApiService.GetRequest(TEAMSHEET_URLS.list)
    return {data2: buildData(data), data, error, isLoaded};
}
export function getTeamsheetById(id)      {
    const {data, error, isLoaded} = ApiService.GetRequestTwo(TEAMSHEET_URLS.findById, id)
    return {data2: buildData(data), data, error, isLoaded};
}
export function updateTeamsheet(teamsheet){
    const {data, error, isLoaded} = ApiService.PostRequest(TEAMSHEET_URLS.update, teamsheet)
    return {data2: buildData(data), data, error, isLoaded};
}
export function addTeamsheet(teamsheet)   {
    const {data, error, isLoaded} = ApiService.PutRequest(TEAMSHEET_URLS.add, teamsheet)
    return {data2: buildData(data), data, error, isLoaded};
}
export function deleteTeamsheetById(id)   {
    const {data, error, isLoaded} = ApiService.DeleteRequest(TEAMSHEET_URLS.deleteById, id)
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