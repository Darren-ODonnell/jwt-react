import { METHODS } from "../common/globals";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

export const Position = 'Position'
const table = {name : Position}

export const positionColumnDefs = [
    { headerName: 'Position Name', field: 'name'  , type: 'string', width: 150, },
    { headerName: 'Abbreviation' , field: 'abbrev', type: 'string', width: 150, },
];

export const positionInitialValue = {
    abbrev: "",
    name  : ""
};
// positions
const POSITION_ADD      = "/position/add";
const POSITION_DELETE   = "/position/delete/";
const POSITION_FINDBYID = "/position/findById/";
const POSITION_LIST     = "/position/list";
const POSITION_UPDATE   = "/position/update";

const POSITION_URLS = {
    add     : POSITION_ADD,
    delete  : POSITION_DELETE,
    findById: POSITION_FINDBYID,
    list    : POSITION_LIST,
    update  : POSITION_UPDATE,
}
const apiRequests = {
    list    : {method: METHODS.GET   , url: POSITION_URLS.list},
    findById: {method: METHODS.GET   , url: POSITION_URLS.findById},
    update  : {method: METHODS.POST  , url: POSITION_URLS.update},
    add     : {method: METHODS.PUT   , url: POSITION_URLS.add},
    delete  : {method: METHODS.DELETE, url: POSITION_URLS.delete}
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            id: row.id,
            name: row.name,
            abbrev  : row.abbrev
        }
        newData.push(newRow)
    })
    return newData;
}


export const positionData = {
    messages    : addMessage(Position),
    type        : Position,
    initialValue: positionInitialValue,
    columnDefs  : positionColumnDefs,
    formColDefs : copyFormColDefs( positionColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( positionColumnDefs, table ), // Grid column definitions
    methods     : apiRequests,
    gridLoader  : gridLoader
};



