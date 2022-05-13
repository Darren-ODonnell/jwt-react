import ApiService from "../api/ApiService";

import { FIXTURE_URLS } from "../common/globals";


export function getFixtures()               {
    const {data, error, isLoaded } = ApiService.GetRequest(FIXTURE_URLS.list)
    return {data2: buildData(data), data, error, isLoaded};
}

export function getFixtureById(id)          {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_URLS.findById, id)
    return {data2: buildData(data), data, error, isLoaded};
 }
export function getFixtureByClub(name)      {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_URLS.findByClub, name)
    return {data2: buildData(data), data, error, isLoaded};
 }

export function getFixtureNextByClub(name)  {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_URLS.nextByClub, name)
    return {data2: buildData(data), data, error, isLoaded};
  }
export function getFixtureByHomeClub(name)  {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_URLS.findByHomeClub, name)
    return {data2: buildData(data), data, error, isLoaded};
 }
export function getFixtureByAwayClub(name)  {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_URLS.findByAwayClub, name)
    return {data2: buildData(data), data, error, isLoaded};
 }

export function getFixtureByCompetitionHomeTeamAwayTeamFixtureDateSeason(competition, homeTeam, awayTeam, FixtureDate, Season) {
    const {data, error, isLoaded } = ApiService.GetRequestFive(FIXTURE_URLS.findByCompetitionHomeTeamAwayTeamFixtureDateSeason, competition, homeTeam, awayTeam, FixtureDate, Season)
    return {data2: buildData(data), data, error, isLoaded};
}

export function updateFixture(fixture)      {  return ApiService.PostRequest(FIXTURE_URLS.update, fixture)  }
export function addFixture(fixture)         {  return ApiService.PutRequest(FIXTURE_URLS.add, fixture)     }
export function deleteFixtureById(id)       {  return ApiService.DeleteRequest(FIXTURE_URLS.deleteById, id)   }



// display named data rather than IDs in place of Competition, hometeam and awayteam
const buildData = data => {
    let newRow = {}
    let newData = [];

    data.forEach(row => {
        newRow = {
            id:              row.id,
            competitionName: row.competition.name,
            homeTeamName:    row.awayTeam.name,
            awayTeamName:    row.homeTeam.name,
            fixtureDate:     row.fixtureDate,
            fixtureTime:     row.fixtureTime,
            season:          row.season,
            round:           row.round
        }
        newData.push(newRow);
    });
    return newData;
}


