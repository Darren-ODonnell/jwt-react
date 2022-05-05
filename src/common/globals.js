// server host ips
// import ENDPOINT from './App'

// backend
export const HOME           = "http://192.168.100.151:8080";
export const WORK           = "http://147.252.81.3:8080";
export const WORK_LAPTOP    = "http://147.252.81.119:8080"
export const SAME_MACHINE   = "http://localhost:8080";
// note: every time AWS EC2 instance is restarted - this host name will need to be changed
export const AWS_BACKEND    = "";

// frontend

export const HOME_LAPTOP    = "http://192.168.100.152:3000"
// note: every time AWS EC2 instance is restarted - this host name will need to be changed
export const AWS_REACT      = ""


export const ENDPOINT       = WORK;


// for Form/Grid columns

export const CLUBS          = 'CLUBS';
export const COMPETITIONS   = 'COMPETITIONS';
export const PLAYERS        = 'PLAYERS';
export const LASTNAMES      = 'LASTNAMES';
export const FIRSTNAMES     = 'FIRSTNAMES';
export const FIXTURES       = 'FIXTURES';
export const EVENTS         = 'EVENTS';
export const TEAMSHEETS     = 'TEAMSHEETS';

export const Club          = 'Club';
export const Competition   = 'Competition';
export const Player        = 'Player';
export const Lastname      = 'Lastname';
export const Firstname     = 'Firstname';
export const Fixture       = 'Fixture';
export const Event         = 'Event';
export const Teamsheet     = 'Teamsheet';

// auth

export const API_AUTH_FORGOT_PASSWORD = "/api/auth/forgot_password";
export const API_AUTH_CHANGE_PASSWORD = "/api/auth/change_password";
export const API_AUTH = "/api/auth/";
export const API_AUTH_DELETEBYID = "/api/auth/deleteById/";
export const API_AUTH_FINDBYID = "/api/auth/findById/";
export const API_AUTH_LIST = "/api/auth/list";
export const API_AUTH_LOGIN = "/api/auth/login";
export const API_AUTH_REGISTER = "/api/auth/register/";
export const API_AUTH_UPDATE = "/api/auth/update";

// clubs
export const CLUB = "/club/";
export const CLUB_ADD = "/club/add";
export const CLUB_DELETEBYID = "/club/deleteById/";
export const CLUB_FINDBYID = "/club/findById/";
export const CLUB_FINDBYNAME = "/club/findByName/";
export const CLUB_LIST = "/club/list";
export const CLUB_UPDATE = "/club/update";

export const HOME_PAGE = CLUB_LIST;

// players

export const PLAYER = "/player/";
export const PLAYER_ADD = "/player/add";
export const PLAYER_DELETEBYID = "/player/deleteById/";
export const PLAYER_FINDBYFIRSTNAME = "/player/findByFirstname/";
export const PLAYER_FINDBYFIRSTNAMELASTNAME = "/player/findByFirstnameLastname/";
export const PLAYER_FINDBYID = "/player/findById/";
export const PLAYER_FINDBYLASTNAME = "/player/findByLastname/";
export const PLAYER_LIST = "/player/list";
export const PLAYER_UPDATE = "/player/update";

// fixtures
export const FIXTURE = "/fixture/";
export const FIXTURE_ADD = "/fixture/add";
export const FIXTURE_DELETEBYID = "/fixture/deleteById/";
export const FIXTURE_FINDBYAWAYBYCLUB = "/fixture/findByAwayByClub/";
export const FIXTURE_FINDBYCLUB = "/fixture/findByClub/";
export const FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON = "/fixture/findByCompetitionHomeTeamAwayTeamFixtureDateSeason";
export const FIXTURE_FINDBYHOMEBYCLUB = "/fixture/findByHomeByClub/";
export const FIXTURE_FINDBYID = "/fixture/findById/";
export const FIXTURE_FINDNEXTBYCLUB = "/fixture/findNextByClub/";
export const FIXTURE_LIST = "/fixture/list";
export const FIXTURE_UPDATE = "/fixture/update";

// competitions
export const COMPETITION = "/competition/";
export const COMPETITION_ADD = "/competition/add";
export const COMPETITION_DELETEBYID = "/competition/deleteById/";
export const COMPETITION_FINDBYID = "/competition/findById/";
export const COMPETITION_FINDBYNAME = "/competition/findByName/";
export const COMPETITION_LIST = "/competition/list";
export const COMPETITION_UPDATE = "/competition/update";

// firstnames
export const FIRSTNAME = "/firstname/";
export const FIRSTNAME_ADD = "/firstname/add";
export const FIRSTNAME_DELETEBYID = "/firstname/deleteById/";
export const FIRSTNAME_FINDBYFIRSTNAME = "/firstname/findByFirstname/";
export const FIRSTNAME_FINDBYID = "/firstname/findById/";
export const FIRSTNAME_FINDENGLISH = "/firstname/findEnglish/";
export const FIRSTNAME_FINDIRISH = "/firstname/findIrish/";
export const FIRSTNAME_LIST = "/firstname/list";
export const FIRSTNAME_UPDATE = "/firstname/update";

// lastnames
export const LASTNAME = "/lastname/";
export const LASTNAME_ADD = "/lastname/add";
export const LASTNAME_DELETEBYID = "/lastname/deleteById/";
export const LASTNAME_FINDBYID = "/lastname/findById/";
export const LASTNAME_FINDBYLASTNAME = "/lastname/findByLastname";
export const LASTNAME_FINDENGLISH = "/lastname/findEnglish/";
export const LASTNAME_FINDIRISH = "/lastname/findIrish/";
export const LASTNAME_LIST = "/lastname/list";
export const LASTNAME_UPDATE = "/lastname/update";

// events
export const EVENT = "/event/";
export const EVENT_ADD = "/event/add";
export const EVENT_DELETEBYID = "/event/deleteById/";
export const EVENT_FINDBYID = "/event/findById/";
export const EVENT_LIST = "/event/list";
export const EVENT_UPDATE = "/event/update";

// teamsheets
export const TEAMSHEET = "/teamsheet/";
export const TEAMSHEET_ADD = "/teamsheet/add";
export const TEAMSHEET_DELETEBYID = "/teamsheet/deleteById/";
export const TEAMSHEET_FINDBYID = "/teamsheet/findById/";
export const TEAMSHEET_LIST = "/teamsheet/list";
export const TEAMSHEET_UPDATE = "/teamsheet/update";

// export const API_AUTH_FORGOT_PASSWORD = ENDPOINT + "/api/auth/forgot_password";
// export const API_AUTH_CHANGE_PASSWORD = ENDPOINT + "/api/auth/change_password";
// export const API_AUTH = ENDPOINT + "/api/auth/";
// export const API_AUTH_DELETEBYID = ENDPOINT + "/api/auth/deleteById/";
// export const API_AUTH_FINDBYID = ENDPOINT + "/api/auth/findById/";
// export const API_AUTH_LIST = ENDPOINT + "/api/auth/list";
// export const API_AUTH_LOGIN = ENDPOINT + "/api/auth/login";
// export const API_AUTH_REGISTER = ENDPOINT + "/api/auth/register/";
// export const API_AUTH_UPDATE = ENDPOINT + "/api/auth/update";
//
// // clubs
// export const CLUB = ENDPOINT + "/club/";
// export const CLUB_ADD = ENDPOINT + "/club/add";
// export const CLUB_DELETEBYID = ENDPOINT + "/club/deleteById/";
// export const CLUB_FINDBYID = ENDPOINT + "/club/findById/";
// export const CLUB_FINDBYNAME = ENDPOINT + "/club/findByName/";
// export const CLUB_LIST = ENDPOINT + "/club/list";
// export const CLUB_UPDATE = ENDPOINT + "/club/update";
//
//
// // players
// export const PLAYER = ENDPOINT + "/player/";
// export const PLAYER_ADD = ENDPOINT + "/player/add";
// export const PLAYER_DELETEBYID = ENDPOINT + "/player/deleteById/";
// export const PLAYER_FINDBYFIRSTNAME = ENDPOINT + "/player/findByFirstname/";
// export const PLAYER_FINDBYFIRSTNAMELASTNAME = ENDPOINT + "/player/findByFirstnameLastname/";
// export const PLAYER_FINDBYID = ENDPOINT + "/player/findById/";
// export const PLAYER_FINDBYLASTNAME = ENDPOINT + "/player/findByLastname/";
// export const PLAYER_LIST = ENDPOINT + "/player/list";
// export const PLAYER_UPDATE = ENDPOINT + "/player/update";
//
// // fixtures
// export const FIXTURE = ENDPOINT + "/fixture/";
// export const FIXTURE_ADD = ENDPOINT + "/fixture/add";
// export const FIXTURE_DELETEBYID = ENDPOINT + "/fixture/deleteById/";
// export const FIXTURE_FINDBYAWAYBYCLUB = ENDPOINT + "/fixture/findByAwayByClub/";
// export const FIXTURE_FINDBYCLUB = ENDPOINT + "/fixture/findByClub/";
// export const FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON = ENDPOINT + "/fixture/findByCompetitionHomeTeamAwayTeamFixtureDateSeason";
// export const FIXTURE_FINDBYHOMEBYCLUB = ENDPOINT + "/fixture/findByHomeByClub/";
// export const FIXTURE_FINDBYID = ENDPOINT + "/fixture/findById/";
// export const FIXTURE_FINDNEXTBYCLUB = ENDPOINT + "/fixture/findNextByClub/";
// export const FIXTURE_LIST = ENDPOINT + "/fixture/list";
// export const FIXTURE_UPDATE = ENDPOINT + "/fixture/update";
//
// // competitions
// export const COMPETITION = ENDPOINT + "/competition/";
// export const COMPETITION_ADD = ENDPOINT + "/competition/add";
// export const COMPETITION_DELETEBYID = ENDPOINT + "/competition/deleteById/";
// export const COMPETITION_FINDBYID = ENDPOINT + "/competition/findById/";
// export const COMPETITION_FINDBYNAME = ENDPOINT + "/competition/findByName/";
// export const COMPETITION_LIST = ENDPOINT + "/competition/list";
// export const COMPETITION_UPDATE = ENDPOINT + "/competition/update";
//
// // firstnames
// export const FIRSTNAME = ENDPOINT + "/firstname/";
// export const FIRSTNAME_ADD = ENDPOINT + "/firstname/add";
// export const FIRSTNAME_DELETEBYID = ENDPOINT + "/firstname/deleteById/";
// export const FIRSTNAME_FINDBYFIRSTNAME = ENDPOINT + "/firstname/findByFirstname/";
// export const FIRSTNAME_FINDBYID = ENDPOINT + "/firstname/findById/";
// export const FIRSTNAME_FINDENGLISH = ENDPOINT + "/firstname/findEnglish/";
// export const FIRSTNAME_FINDIRISH = ENDPOINT + "/firstname/findIrish/";
// export const FIRSTNAME_LIST = ENDPOINT + "/firstname/list";
// export const FIRSTNAME_UPDATE = ENDPOINT + "/firstname/update";
//
// // lastnames
// export const LASTNAME = ENDPOINT + "/lastname/";
// export const LASTNAME_ADD = ENDPOINT + "/lastname/add";
// export const LASTNAME_DELETEBYID = ENDPOINT + "/lastname/deleteById/";
// export const LASTNAME_FINDBYID = ENDPOINT + "/lastname/findById/";
// export const LASTNAME_FINDBYLASTNAME = ENDPOINT + "/lastname/findByLastname";
// export const LASTNAME_FINDENGLISH = ENDPOINT + "/lastname/findEnglish/";
// export const LASTNAME_FINDIRISH = ENDPOINT + "/lastname/findIrish/";
// export const LASTNAME_LIST = ENDPOINT + "/lastname/list";
// export const LASTNAME_UPDATE = ENDPOINT + "/lastname/update";
// // stats