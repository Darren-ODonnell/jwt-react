import { LASTNAMES, Lastname, COMPETITION_URLS, METHODS, FIRSTNAME_URLS, LASTNAME_URLS } from '../../common/globals'
import { addLastname, deleteLastnameById, getLastnames, updateLastname } from "../../services/LastnameService";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../../common/helper";



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
    deleteById    : { method: METHODS.DELETE, url: LASTNAME_URLS.deleteById}
}

const gridLoader = (data) => {

    return data;
}

const actions = {
    add       : addLastname,
    update    : updateLastname,
    deleteById: deleteLastnameById,
    list      : getLastnames
};

export const lastnameData = {
    messages    : addMessage(Lastname),
    type        : Lastname,
    actions     : actions,
    entity      : LASTNAMES,
    initialValue: lastnameInitialValue,
    columnDefs  : lastnameColumnDefs,
    formColDefs : copyFormColDefs( lastnameColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( lastnameColumnDefs ), // Grid column definitions
    methods     : apiRequests,
    gridLoader : gridLoader
};

