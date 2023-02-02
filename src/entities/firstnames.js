import {METHODS} from '../common/globals'
import {addMessage} from "../common/helper";

export const Firstname = 'Firstname'

export const firstnameColumnDefs = [
    { headerName: 'Firstname'      , field: 'firstname'     , type: 'string', width:100,  },
    { headerName: 'Irish Firstname', field: 'firstnameIrish', type: 'string', width:100,  },
];

export const firstnameInitialValue = {
    firstname     : "",
    firstnameIrish: ""
};
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
const apiRequests = {
    list           : { method: METHODS.GET   , url: FIRSTNAME_URLS.list},
    findById       : { method: METHODS.GET   , url: FIRSTNAME_URLS.findById},
    findIrish      : { method: METHODS.GET   , url: FIRSTNAME_URLS.findIrish},
    findEnglish    : { method: METHODS.GET   , url: FIRSTNAME_URLS.findEnglish},
    findByFirstname: { method: METHODS.GET   , url: FIRSTNAME_URLS.findByFirstname},
    update         : { method: METHODS.POST  , url: FIRSTNAME_URLS.update},
    add            : { method: METHODS.PUT   , url: FIRSTNAME_URLS.add},
    delete         : { method: METHODS.DELETE, url: FIRSTNAME_URLS.delete}
}

const gridLoader = (data) => {
    return data;
}

export const firstnameData = {
    messages: addMessage(Firstname),
    type: Firstname,
    initialValue: firstnameInitialValue,
    columnDefs: firstnameColumnDefs,
    formColDefs: firstnameColumnDefs, // form column definitions
    gridColDefs: firstnameColumnDefs, // Grid column definitions
    methods: apiRequests,
    gridLoader: gridLoader
};

