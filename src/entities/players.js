import {METHODS} from '../common/globals'
import {addMessage} from "../common/helper";

export const Player = 'Player'

export const playerColumnDefs = [
    {headerName: 'Firstname', field: 'firstname', width: 120,},
    {headerName: 'Lastname', field: 'lastname', width: 120,},
    {headerName: 'Irish Firstname', field: 'firstnameI', width: 120,},
    {headerName: 'Irish Lastname', field: 'lastnameI', width: 150,},
    {headerName: 'Year of Birth', field: 'yob', width: 100,},
    {headerName: 'Address', field: 'address', width: 150,},
    {headerName: 'Registered', field: 'registered', width: 120,},
    {headerName: 'Grade', field: 'grade', width: 120,},
    {headerName: 'Availability', field: 'availability', width: 120,},
    {headerName: 'Email', field: 'email', width: 100,},
    {headerName: 'Phone', field: 'phone', width: 100,},
    {headerName: 'Phone ICE', field: 'phoneIce', width: 100,},

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
    let newData = [];
    data.forEach(row => {
        const newRow = {
            id : row.id,
            firstname: row.firstname,
            lastname: row.lastname,
            firstnameI: row.firstnameI,
            lastnameI: row.lastnameI,
            yob: row.yob,
            address: row.address,
            email: row.email,
            phone: row.phone,
            phoneIce: row.phoneIce,
            registered: row.registered,
            grade: row.grade,
            availability: row.availability,
        }
        newData.push(newRow)
    })
    return newData
}

export const playerData = {
    messages: addMessage(Player),
    type: Player,
    initialValue: playerInitialValue,
    columnDefs: playerColumnDefs,
    formColDefs: playerColumnDefs, // form column definitions
    gridColDefs: playerColumnDefs, // Grid column definitions
    methods: apiRequests,
    gridLoader: gridLoader
};

