import { Player, PLAYERS } from '../globals'
import { addPlayer, deletePlayerById, getPlayers, updatePlayer } from "../services/PlayerService";
import { addMessage } from "../generic/helper";

export const playerColumnDefs = [
    { headerName: 'Firstname',      field: 'firstname',   type: 'String',  min:5, max:45, required: true },
    { headerName: 'Lastname',       field: 'lastname',    type: 'String',  min:5, max:45, required: true },
    { headerName: 'Irish Firstname',field: 'firstnameI',  type: 'String',  min:5, max:45, required: true },
    { headerName: 'Irish Lastname', field: 'lastnameI',   type: 'String',  min:5, max:45, required: true },
    { headerName: 'Year of Birth',  field: 'yob',         type: 'Integer', min:2000, max:2100, required: true },
    { headerName: 'Address',        field: 'address',     type: 'String',  min:5, max:125, required: true },
    { headerName: 'Email',          field: 'email',       type: 'Email',   min:5, max:100, required: true },
    { headerName: 'Phone',          field: 'phone',       type: 'String',  min:7, max:15, required: true },
    { headerName: 'Phone ICE',      field: 'phoneIce',    type: 'String',  min:7, max:15, required: true },
    { headerName: 'Registered',     field: 'registered',  type: 'Boolean', min:0, max:1, required: true },
    { headerName: 'Grade',          field: 'grade',       type: 'String',  min:5, max:15, required: true },
    { headerName: 'Availability',   field: 'availability',type: 'Boolean', min:0, max:1, required: true },
];

export const playerInitialValue = {
    firstname:"",   lastname:"", firstnameI:"",    lastnameI:"",
    yob:"",         address:"",  email:"",         phone:"",    phoneIce:"",
    registered:"",  grade:"",    availability:""
};

const actions = {
    add: addPlayer,
    update : updatePlayer,
    deleteById: deletePlayerById,
    list: getPlayers
};

export const playerData = {
    messages: addMessage(Player),
    type: Player,
    actions: actions,
    entity: PLAYERS,
    initialValue: playerInitialValue,
    columnDefs: playerColumnDefs,

};
