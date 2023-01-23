import { Statname, METHODS, STAT_NAME_URLS } from "../common/globals";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

const table = {name:Statname}

export const statnameColumnDefs = [
    // { headerName: 'Abbreviation', field: 'id', type: 'String' , min: 8, max: 60, required: true },
    { headerName: 'Stat Name'   , field: 'name'  , type: 'String' , min: 8, max: 60, required: true },
];

export const statnameInitialValue = {
    abbrev: "",
    name  : ""
};

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



