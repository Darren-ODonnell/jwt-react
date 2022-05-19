import { FIRSTNAMES, Firstname, COMPETITION_URLS, METHODS, FIRSTNAME_URLS } from '../../common/globals'
import { addFirstname, deleteFirstnameById, getFirstnames, updateFirstname } from "../../services/FirstnameService";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../../common/helper";

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
    deleteById     : { method: METHODS.DELETE, url: FIRSTNAME_URLS.deleteById}
}

const actions = {
    add       : addFirstname,
    update    : updateFirstname,
    deleteById: deleteFirstnameById,
    list      : getFirstnames
};

const gridLoader = (data) => {

    return data;
}

export const firstnameData = {
    messages    : addMessage(Firstname),
    type        : Firstname,
    actions     : actions,
    entity      : FIRSTNAMES,
    initialValue: firstnameInitialValue,
    columnDefs  : firstnameColumnDefs,
    formColDefs : copyFormColDefs( firstnameColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( firstnameColumnDefs ), // Grid column definitions
    methods     : apiRequests,
    gridLoader : gridLoader
};

