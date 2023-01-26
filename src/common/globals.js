import moment from "moment";

// server host ips
// backend
export const HOME         = "http://192.168.100.151:8080";
export const WORK         = "http://147.252.81.3:8080";
export const WORK_LAPTOP  = "http://147.252.81.83:8080"
export const SAME_MACHINE = "http://localhost:8080";
// note: every time AWS EC2 instance is restarted - this host name will need to be changed
export const AWS_BACKEND  = "";
// frontend
export const HOME_LAPTOP = "http://192.168.100.152:8080"
// note: every time AWS EC2 instance is restarted - this host name will need to be changed
export const AWS_REACT = ""
// active endpoint
export const ENDPOINT = SAME_MACHINE;

// Date/Time
export const DATE_FORMAT = "DD/MM/YYYY"
export const TIME_FORMAT = "HH:mm";         // 24 hour clock without seconds
export const TIME_FORMAT_SAVE = "HH:mm:ss"; // 24 hour clock with seconds
export function getMinTime() {    return moment("09:00","HH:mm")}
export function getMaxTime() {    return moment("20:00","HH:mm")}
export function getMinDate() {    return moment("01/01/"+new Date().getFullYear()  ,"DD/MM/YYYY");}
export function getMaxDate() {    return moment("31/12/"+new Date().getFullYear()+1,"DD/MM/YYYY");}

// static look up arrays
// any other lookup arrays are taken from endpoint
export const ROUNDS = [1,2,3,4,5,6,7,8,9,10]
export const PLAYER_NUMBERS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
export const PITCH_GRIDS = ["A1","A2","A3","B1","B2","B3","C1","C2","C3","D1","D2","D3","E1","E2","E3"]
export function getSeasons() { return [new Date().getFullYear(), new Date().getFullYear()+1] }

// for Form/Grid columns
export const Club        = 'Club';
export const Competition = 'Competition';
export const Player      = 'Player';
export const Lastname    = 'Lastname';
export const Firstname   = 'Firstname';
export const Fixture     = 'Fixture';
export const Statname    = 'Statname';
export const Pitchgrid   = 'Pitchgrid';
export const Position   = 'Position';
export const Teamsheet   = 'Teamsheet';

// auth
const API_AUTH_FORGOT_PASSWORD = "/api/auth/forgot_password";
const API_AUTH_CHANGE_PASSWORD = "/api/auth/change_password";
const API_AUTH_DELETE          = "/api/auth/delete/";
const API_AUTH_FINDBYID        = "/api/auth/findById/";
const API_AUTH_LIST            = "/api/auth/list";
const API_AUTH_LOGIN           = "/api/auth/login";
const API_AUTH_REGISTER        = "/api/auth/register/";
const API_AUTH_UPDATE          = "/api/auth/update";

export const API_AUTH_URLS = {
    forgotPassword: API_AUTH_FORGOT_PASSWORD,
    changePassword: API_AUTH_CHANGE_PASSWORD,
    userDeleteById: API_AUTH_DELETE,
    userFindById: API_AUTH_FINDBYID,
    userList: API_AUTH_LIST,
    login: API_AUTH_LOGIN,
    register: API_AUTH_REGISTER,
    userUpdate: API_AUTH_UPDATE
}

// clubs
const CLUB_ADD        = "/club/add";
const CLUB_DELETE     = "/club/delete/";
const CLUB_FINDBYID   = "/club/findById/";
const CLUB_FINDBYNAME = "/club/findByName/";
const CLUB_LIST       = "/club/list";
const CLUB_UPDATE     = "/club/update";

export const HOME_PAGE = CLUB_LIST;

export const CLUB_URLS = {
    add: CLUB_ADD,
    delete: CLUB_DELETE,
    findById: CLUB_FINDBYID,
    findByName: CLUB_FINDBYNAME,
    list: CLUB_LIST,
    update: CLUB_UPDATE
}

// players
const PLAYER_ADD                     = "/player/add";
const PLAYER_DELETE                  = "/player/delete/";
const PLAYER_FINDBYFIRSTNAME         = "/player/findByFirstname/";
const PLAYER_FINDBYFIRSTNAMELASTNAME = "/player/findByFirstnameLastname/";
const PLAYER_FINDBYID                = "/player/findById/";
const PLAYER_FINDBYLASTNAME          = "/player/findByLastname/";
const PLAYER_LIST                    = "/player/list";
const PLAYER_UPDATE                  = "/player/update";

export const PLAYER_URLS = {
    add                    : PLAYER_ADD,
    delete                 : PLAYER_DELETE,
    findByFirstname        : PLAYER_FINDBYFIRSTNAME,
    findByFirstnameLastname: PLAYER_FINDBYFIRSTNAMELASTNAME,
    findById               : PLAYER_FINDBYID,
    findByLastname         : PLAYER_FINDBYLASTNAME,
    list                   : PLAYER_LIST,
    update                 : PLAYER_UPDATE
}

// fixtures
const FIXTURE_ADD              = "/fixture/add";
const FIXTURE_DELETE           = "/fixture/delete/";
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
    delete        : FIXTURE_DELETE,
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
const COMPETITION_DELETE     = "/competition/delete";
const COMPETITION_FINDBYID   = "/competition/findById/";
const COMPETITION_FINDBYNAME = "/competition/findByName/";
const COMPETITION_LIST       = "/competition/list";
const COMPETITION_UPDATE     = "/competition/update";

export const COMPETITION_URLS = {
    add       : COMPETITION_ADD,
    delete    : COMPETITION_DELETE,
    findByName: COMPETITION_FINDBYNAME,
    findById  : COMPETITION_FINDBYID,
    list      : COMPETITION_LIST,
    update    : COMPETITION_UPDATE,
}

// firstnames
const FIRSTNAME_ADD             = "/firstname/add";
const FIRSTNAME_DELETE          = "/firstname/delete/";
const FIRSTNAME_FINDBYFIRSTNAME = "/firstname/findByFirstname/";
const FIRSTNAME_FINDBYID        = "/firstname/findById/";
const FIRSTNAME_FINDENGLISH     = "/firstname/findEnglish/";
const FIRSTNAME_FINDIRISH       = "/firstname/findIrish/";
const FIRSTNAME_LIST            = "/firstname/list";
const FIRSTNAME_UPDATE          = "/firstname/update";

export const FIRSTNAME_URLS = {
    add            : FIRSTNAME_ADD,
    delete         : FIRSTNAME_DELETE,
    findByFirstname: FIRSTNAME_FINDBYFIRSTNAME,
    findById       : FIRSTNAME_FINDBYID,
    findEnglish    : FIRSTNAME_FINDENGLISH,
    findIrish      : FIRSTNAME_FINDIRISH,
    list           : FIRSTNAME_LIST,
    update         : FIRSTNAME_UPDATE
}

// lastnames
const LASTNAME_ADD            = "/lastname/add";
const LASTNAME_DELETE         = "/lastname/delete/";
const LASTNAME_FINDBYID       = "/lastname/findById/";
const LASTNAME_FINDBYLASTNAME = "/lastname/findByLastname";
const LASTNAME_FINDENGLISH    = "/lastname/findEnglish/";
const LASTNAME_FINDIRISH      = "/lastname/findIrish/";
const LASTNAME_LIST           = "/lastname/list";
const LASTNAME_UPDATE         = "/lastname/update";

export const LASTNAME_URLS = {
    add           : LASTNAME_ADD,
    delete        : LASTNAME_DELETE,
    findByLastname: LASTNAME_FINDBYLASTNAME,
    findById      : LASTNAME_FINDBYID,
    findEnglish   : LASTNAME_FINDENGLISH,
    findIrish     : LASTNAME_FINDIRISH,
    list          : LASTNAME_LIST,
    update        : LASTNAME_UPDATE,
}

// statnames
const STAT_NAME_ADD      = "/statname/add";
const STAT_NAME_DELETE   = "/statname/delete/";
const STAT_NAME_FINDBYID = "/statname/findById/";
const STAT_NAME_LIST     = "/statname/list";
const STAT_NAME_UPDATE   = "/statname/update";

export const STAT_NAME_URLS = {
    add     : STAT_NAME_ADD,
    delete  : STAT_NAME_DELETE,
    findById: STAT_NAME_FINDBYID,
    list    : STAT_NAME_LIST,
    update  : STAT_NAME_UPDATE,
}

// pitchgrid
const PITCH_GRID_ADD      = "/pitchgrid/add";
const PITCH_GRID_DELETE   = "/pitchgrid/delete/";
const PITCH_GRID_FINDBYID = "/pitchgrid/findById/";
const PITCH_GRID_LIST     = "/pitchgrid/list";
const PITCH_GRID_UPDATE   = "/pitchgrid/update";

export const PITCH_GRID_URLS = {
    add     : PITCH_GRID_ADD,
    delete  : PITCH_GRID_DELETE,
    findById: PITCH_GRID_FINDBYID,
    list    : PITCH_GRID_LIST,
    update  : PITCH_GRID_UPDATE,
}

// positions
const POSITION_ADD      = "/position/add";
const POSITION_DELETE   = "/position/delete/";
const POSITION_FINDBYID = "/position/findById/";
const POSITION_LIST     = "/position/list";
const POSITION_UPDATE   = "/position/update";

export const POSITION_URLS = {
    add     : POSITION_ADD,
    delete  : POSITION_DELETE,
    findById: POSITION_FINDBYID,
    list    : POSITION_LIST,
    update  : POSITION_UPDATE,
}


// teamsheets
const TEAMSHEET_ADD      = "/teamsheet/add";
const TEAMSHEET_DELETE   = "/teamsheet/delete/";
const TEAMSHEET_FINDBYID = "/teamsheet/findById/";
const TEAMSHEET_LIST     = "/teamsheet/list";
const TEAMSHEET_UPDATE   = "/teamsheet/update";

export const TEAMSHEET_URLS = {
    add     : TEAMSHEET_ADD,
    delete  : TEAMSHEET_DELETE,
    findById: TEAMSHEET_FINDBYID,
    list    : TEAMSHEET_LIST,
    update  : TEAMSHEET_UPDATE,
}

export const API_TYPE = {
    GET        : "GET",
    POST       : "POST",
    PUT        : "PUT",
    DELETE     : "DELETE"
}

export const METHODS = {
    GET   : 'GET',
    POST  : 'POST',
    PUT   : 'PUT',
    DELETE: 'DELETE'
}

