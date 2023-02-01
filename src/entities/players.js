import { METHODS } from '../common/globals'
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

export const Player = 'Player'

const table = {name:Player}

export const playerColumnDefs = [
    { headerName: 'Firstname'      , field: 'firstname'   , type: 'string' , width: 100, },
    {headerName : 'Lastname'       , field: 'lastname'    , type: 'string' , width: 100, },
    {headerName : 'Irish Firstname', field: 'firstnameI'  , type: 'string' , width: 100, },
    {headerName : 'Irish Lastname' , field: 'lastnameI'   , type: 'string' , width: 150, },
    {headerName : 'Year of Birth'  , field: 'yob'         , type: 'Integer', width: 60 , },
    {headerName : 'Address'        , field: 'address'     , type: 'string' , width: 150, },
    {headerName : 'Email'          , field: 'email'       , type: 'string'  , width: 150, },
    {headerName : 'Phone'          , field: 'phone'       , type: 'string' , width: 150, },
    {headerName : 'Phone ICE'      , field: 'phoneIce'    , type: 'string' , width: 150, },
    {headerName : 'Registered'     , field: 'registered'  , type: 'boolean', width: 120, },
    {headerName : 'Grade'          , field: 'grade'       , type: 'string' , width: 80 , },
    {headerName : 'Availability'   , field: 'availability', type: 'string' , width: 80 , },
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
    list    : {method: METHODS.GET   , url: PLAYER_URLS.list},
    findById: {method: METHODS.GET   , url: PLAYER_URLS.findById},
    update  : {method: METHODS.POST  , url: PLAYER_URLS.update},
    add     : {method: METHODS.PUT   , url: PLAYER_URLS.add},
    delete  : {method: METHODS.DELETE, url: PLAYER_URLS.delete}
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

