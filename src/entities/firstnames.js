import { Firstname, METHODS, FIRSTNAME_URLS, Club } from '../common/globals'
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";
const table = {name:Firstname}

export const firstnameColumnDefs = [
    { headerName: 'Firstname'      , field: 'firstname'     , type: 'String', min: 3, max: 45, required: true  },
    { headerName: 'Irish Firstname', field: 'firstnameIrish', type: 'String', min: 3, max: 45, required: true  },
];

export const firstnameInitialValue = {
    firstname     : "",
    firstnameIrish: ""
};

const apiRequests = {
    list           : { method: METHODS.GET   , url: FIRSTNAME_URLS.list},
    findById       : { method: METHODS.GET   , url: FIRSTNAME_URLS.findById},
    findIrish      : { method: METHODS.GET   , url: FIRSTNAME_URLS.findIrish},
    findEnglish    : { method: METHODS.GET   , url: FIRSTNAME_URLS.findEnglish},
    findByFirstname: { method: METHODS.GET   , url: FIRSTNAME_URLS.findByFirstname},
    update         : { method: METHODS.POST  , url: FIRSTNAME_URLS.update},
    add            : { method: METHODS.PUT   , url: FIRSTNAME_URLS.add},
    delete: {method: METHODS.DELETE, url: FIRSTNAME_URLS.delete}
}

const gridLoader = (data) => {

    return data;
}

export const firstnameData = {
    messages    : addMessage(Firstname),
    type        : Firstname,
    initialValue: firstnameInitialValue,
    columnDefs  : firstnameColumnDefs,
    formColDefs : copyFormColDefs( firstnameColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( firstnameColumnDefs , table), // Grid column definitions
    methods     : apiRequests,
    gridLoader: gridLoader
};

