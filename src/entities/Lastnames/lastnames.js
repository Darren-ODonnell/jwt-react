import { LASTNAMES, Lastname } from '../../common/globals'
import { addLastname, deleteLastnameById, getLastnames, updateLastname } from "../../services/LastnameService";
import { addMessage } from "../../common/helper";

export const lastnameColumnDefs = [
    { headerName: 'Lastname',       field: 'lastname',     type: 'String', min:3, max:45, required: true  },
    { headerName: 'Irish Lastname', field: 'lastnameIrish',type: 'String', min:3, max:45, required: true  },
];

export const lastnameInitialValue = {
    lastname:"",
    lastnameIrish:""
};

const actions = {
    add: addLastname,
    update : updateLastname,
    deleteById: deleteLastnameById,
    list: getLastnames
};

export const lastnameData = {
    messages: addMessage(Lastname),
    type: Lastname,
    actions: actions,
    entity: LASTNAMES,
    initialValue: lastnameInitialValue,
    columnDefs: lastnameColumnDefs
};