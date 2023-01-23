import { Lastname, METHODS, LASTNAME_URLS, Club } from '../common/globals'
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";


const table = {name:Lastname}
export const lastnameColumnDefs = [
    { headerName: 'Lastname'      , field: 'lastname'     , type: 'String', min: 3, max: 45, required: true  },
    { headerName: 'Irish Lastname', field: 'lastnameIrish', type: 'String', min: 3, max: 45, required: true  },
];

export const lastnameInitialValue = {
    lastname     : "",
    lastnameIrish: ""
};

const apiRequests = {
    list          : { method: METHODS.GET   , url: LASTNAME_URLS.list},
    findById      : { method: METHODS.GET   , url: LASTNAME_URLS.findById},
    findIrish     : { method: METHODS.GET   , url: LASTNAME_URLS.findIrish},
    findEnglish   : { method: METHODS.GET   , url: LASTNAME_URLS.findEnglish},
    findByLastname: { method: METHODS.GET   , url: LASTNAME_URLS.findByLastname},
    update        : { method: METHODS.POST  , url: LASTNAME_URLS.update},
    add           : { method: METHODS.PUT   , url: LASTNAME_URLS.add},
    delete: {method: METHODS.DELETE, url: LASTNAME_URLS.delete}
}

const gridLoader = (data) => {

    return data;
}


export const lastnameData = {
    messages    : addMessage(Lastname),
    type        : Lastname,
    initialValue: lastnameInitialValue,
    columnDefs  : lastnameColumnDefs,
    formColDefs : copyFormColDefs( lastnameColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( lastnameColumnDefs, table ), // Grid column definitions
    methods     : apiRequests,
    gridLoader: gridLoader
};

