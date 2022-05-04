import { GetRequest, GetRequestTwo, GetRequestFive, PostRequest, PutRequest, DeleteRequest } from "../api/apiRequests";

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

export function getFixtures()               {  return GetRequest(FIXTURE_LIST)             }
export function getFixtureById(id)          {  return GetRequestTwo(FIXTURE_FINDBYID, id)     }
export function getFixtureByClub(name)      {  return GetRequestTwo(FIXTURE_FINDBYCLUB, name) }
export function getFixtureNextByClub(name)  {  return GetRequestTwo(FIXTURE_FINDNEXTBYCLUB, name)    }
export function getFixtureByHomeClub(name)  {  return GetRequestTwo(FIXTURE_FINDBYHOMEBYCLUB, name)  }
export function getFixtureByAwayClub(name)  {  return GetRequestTwo(FIXTURE_FINDBYAWAYBYCLUB, name)  }

export function getFixtureByCompetitionHomeTeamAwayTeamFixtureDateSeason(competition, homeTteam, awayTeam, FixtureDate, Season) {
    return GetRequestFive(FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON, competition, homeTteam, awayTeam, FixtureDate, Season)  }

export function updateFixture(fixture)      {  return PostRequest(FIXTURE_UPDATE, fixture)  }
export function addFixture(fixture)         {  return PutRequest(FIXTURE_ADD, fixture)     }
export function deleteFixtureById(id)       {  return DeleteRequest(FIXTURE_DELETEBYID, id)   }



