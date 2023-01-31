import { METHODS } from "../common/globals";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

export const Statname = 'Statname'

const table = {name:Statname}

export const statnameColumnDefs = [
    {headerName: 'Abbreviation', field: 'abbrev', type: 'String', width: 150, },
    {headerName: 'Stat Name'   , field: 'name'  , type: 'String', width: 150, },
];

export const statnameInitialValue = {
    abbrev: "",
    name  : ""
};
// statnames
const STAT_NAME_ADD      = "/statname/add";
const STAT_NAME_DELETE   = "/statname/delete/";
const STAT_NAME_FINDBYID = "/statname/findById/";
const STAT_NAME_LIST     = "/statname/list";
const STAT_NAME_UPDATE   = "/statname/update";

const STAT_NAME_URLS = {
    add     : STAT_NAME_ADD,
    delete  : STAT_NAME_DELETE,
    findById: STAT_NAME_FINDBYID,
    list    : STAT_NAME_LIST,
    update  : STAT_NAME_UPDATE,
}
const apiRequests = {
    list    : {method: METHODS.GET   , url: STAT_NAME_URLS.list},
    findById: {method: METHODS.GET   , url: STAT_NAME_URLS.findById},
    update  : {method: METHODS.POST  , url: STAT_NAME_URLS.update},
    add     : {method: METHODS.PUT   , url: STAT_NAME_URLS.add},
    delete  : {method: METHODS.DELETE, url: STAT_NAME_URLS.delete}
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            abbrev: row.id,
            name  : row.name
        }
        newData.push(newRow)
    })
    return newData;
}


export const statnameData = {
    messages    : addMessage(Statname),
    type        : Statname,
    initialValue: statnameInitialValue,
    columnDefs  : statnameColumnDefs,
    formColDefs : copyFormColDefs( statnameColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( statnameColumnDefs, table ), // Grid column definitions
    methods     : apiRequests,
    gridLoader  : gridLoader
};



