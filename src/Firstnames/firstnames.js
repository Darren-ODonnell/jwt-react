import { FIRSTNAMES, Firstname } from '../globals'
import { addFirstname, deleteFirstnameById, getFirstnames, updateFirstname } from "../services/FirstnameService";
import { addMessage } from "../generic/helper";

export const firstnameColumnDefs = [
    { headerName: 'Firstname',       field: 'firstname',      type: 'String', min:3, max:45, required: true  },
    { headerName: 'Irish Firstname', field: 'firstnameIrish', type: 'String', min:3, max:45, required: true  },
];

export const firstnameInitialValue = {
    firstname:"",
    firstnameIrish:""
};

const actions = {
    add: addFirstname,
    update : updateFirstname,
    deleteById: deleteFirstnameById,
    list: getFirstnames
};

export const firstnameData = {
    messages: addMessage(Firstname),
    type: Firstname,
    actions: actions,
    entity: FIRSTNAMES,
    initialValue: firstnameInitialValue,
    columnDefs: firstnameColumnDefs
};