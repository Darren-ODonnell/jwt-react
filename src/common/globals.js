// server host ips
// import ENDPOINT from './App'

// backend

export const HOME         = "http://192.168.100.151:8080";
export const WORK         = "http://147.252.81.3:8080";
export const WORK_LAPTOP  = "http://147.252.81.86:8080"
export const SAME_MACHINE = "http://localhost:8080";
// note: every time AWS EC2 instance is restarted - this host name will need to be changed
export const AWS_BACKEND  = "";

// frontend
export const HOME_LAPTOP    = "http://192.168.100.152:3000"
// note: every time AWS EC2 instance is restarted - this host name will need to be changed
export const AWS_REACT      = ""

export const ENDPOINT       = WORK_LAPTOP;

// for Form/Grid columns
export const CLUBS        = 'CLUBS';
export const COMPETITIONS = 'COMPETITIONS';
export const PLAYERS      = 'PLAYERS';
export const LASTNAMES    = 'LASTNAMES';
export const FIRSTNAMES   = 'FIRSTNAMES';
export const FIXTURES     = 'FIXTURES';
export const EVENTS       = 'EVENTS';
export const TEAMSHEETS   = 'TEAMSHEETS';

export const Club        = 'Club';
export const Competition = 'Competition';
export const Player      = 'Player';
export const Lastname    = 'Lastname';
export const Firstname   = 'Firstname';
export const Fixture     = 'Fixture';
export const Event       = 'Event';
export const Teamsheet   = 'Teamsheet';

// auth
const API_AUTH_FORGOT_PASSWORD = "/api/auth/forgot_password";
const API_AUTH_CHANGE_PASSWORD = "/api/auth/change_password";
const API_AUTH_DELETEBYID      = "/api/auth/deleteById/";
const API_AUTH_FINDBYID        = "/api/auth/findById/";
const API_AUTH_LIST            = "/api/auth/list";
const API_AUTH_LOGIN           = "/api/auth/login";
const API_AUTH_REGISTER        = "/api/auth/register/";
const API_AUTH_UPDATE          = "/api/auth/update";

export const API_AUTH_URLS =  {
    forgotPassword: API_AUTH_FORGOT_PASSWORD,
    changePassword: API_AUTH_CHANGE_PASSWORD,
    userDeleteById: API_AUTH_DELETEBYID,
    userFindById  : API_AUTH_FINDBYID,
    userList      : API_AUTH_LIST,
    login         : API_AUTH_LOGIN,
    register      : API_AUTH_REGISTER,
    userUpdate    : API_AUTH_UPDATE
}


// clubs
const CLUB_ADD         = "/club/add";
const CLUB_DELETEBYID  = "/club/deleteById/";
const CLUB_FINDBYID    = "/club/findById/";
const CLUB_FINDBYNAME  = "/club/findByName/";
const CLUB_LIST = "/club/list";
const CLUB_UPDATE      = "/club/update";

export const HOME_PAGE = CLUB_LIST;

export const CLUB_URLS = {
    add       : CLUB_ADD,
    deleteById: CLUB_DELETEBYID,
    findById  : CLUB_FINDBYID,
    findByName: CLUB_FINDBYNAME,
    list      : CLUB_LIST,
    update    : CLUB_UPDATE
}

// players
const PLAYER_ADD                     = "/player/add";
const PLAYER_DELETEBYID              = "/player/deleteById/";
const PLAYER_FINDBYFIRSTNAME         = "/player/findByFirstname/";
const PLAYER_FINDBYFIRSTNAMELASTNAME = "/player/findByFirstnameLastname/";
const PLAYER_FINDBYID                = "/player/findById/";
const PLAYER_FINDBYLASTNAME          = "/player/findByLastname/";
const PLAYER_LIST                    = "/player/list";
const PLAYER_UPDATE                  = "/player/update";

export const PLAYER_URLS = {
    add                    : PLAYER_ADD,
    deleteById             : PLAYER_DELETEBYID,
    findByFirstname        : PLAYER_FINDBYFIRSTNAME,
    findByFirstnameLastname: PLAYER_FINDBYFIRSTNAMELASTNAME,
    findById               : PLAYER_FINDBYID,
    findByLastname         : PLAYER_FINDBYLASTNAME,
    list                   : PLAYER_LIST,
    update                 : PLAYER_UPDATE
}



// fixtures
const FIXTURE_ADD              = "/fixture/add";
const FIXTURE_DELETEBYID       = "/fixture/deleteById/";
const FIXTURE_FINDBYAWAYBYCLUB = "/fixture/findByAwayByClub/";
const FIXTURE_FINDBYCLUB       = "/fixture/findByClub/";
const FIXTURE_FINDBYHOMEBYCLUB = "/fixture/findByHomeByClub/";
const FIXTURE_FINDBYID         = "/fixture/findById/";
const FIXTURE_FINDNEXTBYCLUB   = "/fixture/findNextByClub/";
const FIXTURE_LIST             = "/fixture/list";
const FIXTURE_UPDATE           = "/fixture/update";

const FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON = "/fixture/findByCompetitionHomeTeamAwayTeamFixtureDateSeason";

export const FIXTURE_URLS = {
    add           : FIXTURE_ADD,
    deleteById    : FIXTURE_DELETEBYID,
    findByAwayClub: FIXTURE_FINDBYAWAYBYCLUB,
    findByHomeClub: FIXTURE_FINDBYHOMEBYCLUB,
    findById      : FIXTURE_FINDBYID,
    findByClub    : FIXTURE_FINDBYCLUB,
    list          : FIXTURE_LIST,
    update        : FIXTURE_UPDATE,
    nextByClub    : FIXTURE_FINDNEXTBYCLUB,

    findByCompetitionHomeTeamAwayTeamFixtureDateSeason: FIXTURE_FINDBYCOMPETITIONHOMETEAMAWAYTEAMFIXTUREDATESEASON,
}

// competitions
const COMPETITION_ADD        = "/competition/add";
const COMPETITION_DELETEBYID = "/competition/deleteById/";
const COMPETITION_FINDBYID   = "/competition/findById/";
const COMPETITION_FINDBYNAME = "/competition/findByName/";
const COMPETITION_LIST       = "/competition/list";
const COMPETITION_UPDATE     = "/competition/update";

export const COMPETITION_URLS = {
    add       : COMPETITION_ADD,
    deleteById: COMPETITION_DELETEBYID,
    findByName: COMPETITION_FINDBYNAME,
    findById  : COMPETITION_FINDBYID,
    list      : COMPETITION_LIST,
    update    : COMPETITION_UPDATE,
}


// firstnames
const FIRSTNAME_ADD             = "/firstname/add";
const FIRSTNAME_DELETEBYID      = "/firstname/deleteById/";
const FIRSTNAME_FINDBYFIRSTNAME = "/firstname/findByFirstname/";
const FIRSTNAME_FINDBYID        = "/firstname/findById/";
const FIRSTNAME_FINDENGLISH     = "/firstname/findEnglish/";
const FIRSTNAME_FINDIRISH       = "/firstname/findIrish/";
const FIRSTNAME_LIST            = "/firstname/list";
const FIRSTNAME_UPDATE          = "/firstname/update";

export const FIRSTNAME_URLS = {
    add            : FIRSTNAME_ADD,
    deleteById     : FIRSTNAME_DELETEBYID,
    findByFirstname: FIRSTNAME_FINDBYFIRSTNAME,
    findById       : FIRSTNAME_FINDBYID,
    findEnglish    : FIRSTNAME_FINDENGLISH,
    findIrish      : FIRSTNAME_FINDIRISH,
    list           : FIRSTNAME_LIST,
    update         : FIRSTNAME_UPDATE
}

// lastnames
const LASTNAME_ADD            = "/lastname/add";
const LASTNAME_DELETEBYID     = "/lastname/deleteById/";
const LASTNAME_FINDBYID       = "/lastname/findById/";
const LASTNAME_FINDBYLASTNAME = "/lastname/findByLastname";
const LASTNAME_FINDENGLISH    = "/lastname/findEnglish/";
const LASTNAME_FINDIRISH      = "/lastname/findIrish/";
const LASTNAME_LIST           = "/lastname/list";
const LASTNAME_UPDATE         = "/lastname/update";

export const LASTNAME_URLS = {
    add           : LASTNAME_ADD,
    deleteById    : LASTNAME_DELETEBYID,
    findByLastname: LASTNAME_FINDBYLASTNAME,
    findById      : LASTNAME_FINDBYID,
    findEnglish   : LASTNAME_FINDENGLISH,
    findIrish     : LASTNAME_FINDIRISH,
    list          : LASTNAME_LIST,
    update        : LASTNAME_UPDATE,
}

// events
const EVENT_ADD        = "/event/add";
const EVENT_DELETEBYID = "/event/deleteById/";
const EVENT_FINDBYID   = "/event/findById/";
const EVENT_LIST       = "/event/list";
const EVENT_UPDATE     = "/event/update";

export const EVENT_URLS = {
    add       : EVENT_ADD,
    deleteById: EVENT_DELETEBYID,
    findById  : EVENT_FINDBYID,
    list      : EVENT_LIST,
    update    : EVENT_UPDATE,
}

// teamsheets
const TEAMSHEET_ADD        = "/teamsheet/add";
const TEAMSHEET_DELETEBYID = "/teamsheet/deleteById/";
const TEAMSHEET_FINDBYID   = "/teamsheet/findById/";
const TEAMSHEET_LIST       = "/teamsheet/list";
const TEAMSHEET_UPDATE     = "/teamsheet/update";

export const TEAMSHEET_URLS = {
    add       : TEAMSHEET_ADD,
    deleteById: TEAMSHEET_DELETEBYID,
    findById  : TEAMSHEET_FINDBYID,
    list      : TEAMSHEET_LIST,
    update    : TEAMSHEET_UPDATE,
}

export const API_TYPE = {
    GET        : "GET",
    POST       : "POST",
    PUT        : "PUT",
    DELETE     : "DELETE"
}

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}