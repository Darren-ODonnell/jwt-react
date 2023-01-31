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
export const DATE_FORMAT = "YYYY-MM-DD"
export const TIME_FORMAT = "HH:mm";         // 24 hour clock without seconds
export const TIME_FORMAT_SAVE = "HH:mm:ss"; // 24 hour clock with seconds

// static look up arrays
// any other lookup arrays are taken from the endpoint
export const ROUNDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const PLAYER_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
export const PITCH_GRIDS = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3", "D1", "D2", "D3", "E1", "E2", "E3"]
export const GRADES = ['S1', 'S2', 'I1', 'I2', 'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10']
export const REGISTERED =  ["True", "False"]
export const AVAIL =  ["True", "False"]
export const HALF = [ 1, 2 ]
export const SUCCESS =  ["True", "False"]
export const COMPETITIONS = ['League Cup', "Summer Cup", "Championship"]
export const POSITIONS = [
    'Goal Keeper',
    'Left Full Back',
    'Full Back',
    'Right Full Back',
    'Left Half Back',
    'Centre Back',
    'Right Half Back',
    'Left Midfield',
    'Right Midfield',
    'Left Half Forward',
    'Centre Forward',
    'Right Half Forward',
    'Left Full Forward',
    'Full Forward',
    'Right Full Forward',
    'Substitute',
]

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

