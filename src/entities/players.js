import { METHODS } from '../common/globals'
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

export const Player = 'Player'

const table = {name:Player}

export const playerColumnDefs = [
    { headerName: 'Firstname'      , field: 'firstname'   , type: 'String' , min: 5   , max: 45  , required: true },
    { headerName: 'Lastname'       , field: 'lastname'    , type: 'String' , min: 5   , max: 45  , required: true },
    { headerName: 'Irish Firstname', field: 'firstnameI'  , type: 'String' , min: 5   , max: 45  , required: true },
    { headerName: 'Irish Lastname' , field: 'lastnameI'   , type: 'String' , min: 5   , max: 45  , required: true },
    { headerName: 'Year of Birth'  , field: 'yob'         , type: 'Integer', min: 2000, max: 2100, required: true },
    { headerName: 'Address'        , field: 'address'     , type: 'String' , min: 5   , max: 125 , required: true },
    { headerName: 'Email'          , field: 'email'       , type: 'Email'  , min: 5   , max: 100 , required: true },
    { headerName: 'Phone'          , field: 'phone'       , type: 'String' , min: 7   , max: 15  , required: true },
    { headerName: 'Phone ICE'      , field: 'phoneIce'    , type: 'String' , min: 7   , max: 15  , required: true },
    { headerName: 'Registered'     , field: 'registered'  , type: 'Boolean', min: 0   , max: 1   , required: true },
    { headerName: 'Grade'          , field: 'grade'       , type: 'String' , min: 5   , max: 15  , required: true },
    { headerName: 'Availability'   , field: 'availability', type: 'Boolean', min: 0   , max: 1   , required: true },
];

export const playerInitialValue = {
    firstname : "", lastname: "", firstnameI  : "", lastnameI: "",
    yob       : "", address : "", email       : "", phone    : "", phoneIce: "",
    registered: "", grade   : "", availability: ""
};
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

export const apiRequests = {
    list: {method: METHODS.GET, url: PLAYER_URLS.list},
    findById: {method: METHODS.GET, url: PLAYER_URLS.findById},
    update: {method: METHODS.POST, url: PLAYER_URLS.update},
    add: {method: METHODS.PUT, url: PLAYER_URLS.add},
    delete: {method: METHODS.DELETE, url: PLAYER_URLS.delete}
}
const gridLoader = (data) => {
    return data;
}

export const playerData = {
    messages    : addMessage(Player),
    type        : Player,
    initialValue: playerInitialValue,
    columnDefs  : playerColumnDefs,
    formColDefs : copyFormColDefs( playerColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( playerColumnDefs, table ), // Grid column definitions
    methods     : apiRequests,
    gridLoader: gridLoader
};

