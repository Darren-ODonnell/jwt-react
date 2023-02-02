import {METHODS} from '../common/globals'
import {addMessage} from "../common/helper";

export const Lastname = 'Lastname'

export const lastnameColumnDefs = [
    {headerName: 'Lastname', field: 'lastname', width: 150,},
    {headerName: 'Irish Lastname', field: 'lastnameIrish', width: 150,},
];

export const lastnameInitialValue = {
    lastname     : "",
    lastnameIrish: ""
};

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


const apiRequests = {
    list          : { method: METHODS.GET   , url: LASTNAME_URLS.list},
    findById      : { method: METHODS.GET   , url: LASTNAME_URLS.findById},
    findIrish     : { method: METHODS.GET   , url: LASTNAME_URLS.findIrish},
    findEnglish   : { method: METHODS.GET   , url: LASTNAME_URLS.findEnglish},
    findByLastname: { method: METHODS.GET   , url: LASTNAME_URLS.findByLastname},
    update        : { method: METHODS.POST  , url: LASTNAME_URLS.update},
    add           : { method: METHODS.PUT   , url: LASTNAME_URLS.add},
    delete        : { method : METHODS.DELETE, url: LASTNAME_URLS.delete}
}

const gridLoader = (data) => {
    return data;
}


export const lastnameData = {
    messages: addMessage(Lastname),
    type: Lastname,
    initialValue: lastnameInitialValue,
    columnDefs: lastnameColumnDefs,
    formColDefs: lastnameColumnDefs, // form column definitions
    gridColDefs: lastnameColumnDefs, // Grid column definitions
    methods: apiRequests,
    gridLoader: gridLoader
};

