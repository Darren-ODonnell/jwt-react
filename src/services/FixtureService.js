import ApiService from "../api/ApiService";

import {    FIXTURE_FINDBYID,
            FIXTURE_LIST,
            FIXTURE_UPDATE,
            FIXTURE_ADD,
            FIXTURE_DELETEBYID,
            FIXTURE_FINDBYAWAYBYCLUB,
            FIXTURE_FINDBYCLUB,
            FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON,
            FIXTURE_FINDBYHOMEBYCLUB,
            FIXTURE_FINDNEXTBYCLUB,
        } from "../common/globals";
import {useEffect} from "react";

export function getFixtures()               {
    const {data, error, isLoaded } = ApiService.GetRequest(FIXTURE_LIST)
    return {data2: buildData(data), data, error, isLoaded};
}

export function getFixtureById(id)          {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_FINDBYID, id)
    return {data2: buildData(data), data, error, isLoaded};
 }
export function getFixtureByClub(name)      {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_FINDBYCLUB, name)
    return {data2: buildData(data), data, error, isLoaded};
 }

export function getFixtureNextByClub(name)  {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_FINDNEXTBYCLUB, name)
    return {data2: buildData(data), data, error, isLoaded};
  }
export function getFixtureByHomeClub(name)  {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_FINDBYHOMEBYCLUB, name)
    return {data2: buildData(data), data, error, isLoaded};
 }
export function getFixtureByAwayClub(name)  {
    const {data, error, isLoaded } = ApiService.GetRequestTwo(FIXTURE_FINDBYAWAYBYCLUB, name)
    return {data2: buildData(data), data, error, isLoaded};
 }

export function getFixtureByCompetitionHomeTeamAwayTeamFixtureDateSeason(competition, homeTeam, awayTeam, FixtureDate, Season) {
    const {data, error, isLoaded } = ApiService.GetRequestFive(FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON, competition, homeTeam, awayTeam, FixtureDate, Season)
    return {data2: buildData(data), data, error, isLoaded};
}

export function updateFixture(fixture)      {  return ApiService.PostRequest(FIXTURE_UPDATE, fixture)  }
export function addFixture(fixture)         {  return ApiService.PutRequest(FIXTURE_ADD, fixture)     }
export function deleteFixtureById(id)       {  return ApiService.DeleteRequest(FIXTURE_DELETEBYID, id)   }



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


