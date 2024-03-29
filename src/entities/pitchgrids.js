import {METHODS} from "../common/globals";
import {addMessage} from "../common/helper";

export const Pitchgrid = 'Pitchgrid'

export const pitchgridColumnDefs = [
    {headerName: 'Abbreviation', field: 'abbrev', width: 150,},
    {headerName: 'Pitchgrid', field: 'name', width: 150,},
];

export const pitchgridInitialValue = {
    abbrev: "",
    name  : ""
};


const PITCH_GRID_ADD      = "/pitchgrid/add";
const PITCH_GRID_DELETE   = "/pitchgrid/delete/";
const PITCH_GRID_FINDBYID = "/pitchgrid/findById/";
const PITCH_GRID_LIST     = "/pitchgrid/list";
const PITCH_GRID_UPDATE   = "/pitchgrid/update";

export const PITCH_GRID_URLS = {
    add: PITCH_GRID_ADD,
    delete: PITCH_GRID_DELETE,
    findById: PITCH_GRID_FINDBYID,
    list: PITCH_GRID_LIST,
    update: PITCH_GRID_UPDATE,
}
const apiRequests = {
    list: {method: METHODS.GET, url: PITCH_GRID_URLS.list},
    findById: {method: METHODS.GET, url: PITCH_GRID_URLS.findById},
    update: {method: METHODS.POST, url: PITCH_GRID_URLS.update},
    add     : {method: METHODS.PUT   , url: PITCH_GRID_URLS.add},
    delete  : {method: METHODS.DELETE, url: PITCH_GRID_URLS.delete}
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            id: row.id,
            abbrev: row.id,
            name  : row.name
        }
        newData.push(newRow)
    })
    return newData;
}


export const pitchgridData = {
    messages: addMessage(Pitchgrid),
    type: Pitchgrid,
    initialValue: pitchgridInitialValue,
    columnDefs: pitchgridColumnDefs,
    methods: apiRequests,
    gridLoader: gridLoader
};



