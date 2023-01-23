import { Statname, METHODS, POSITION_URLS, Position } from "../common/globals";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

const table = {name:Position}

export const positionColumnDefs = [
    // { headerName: 'Abbreviation', field: 'id', type: 'String' , min: 8, max: 60, required: true },
    { headerName: 'Position Name'  , field: 'name'  , type: 'String' , min: 8, max: 60, required: true },
    { headerName: 'Abbreviation'   , field: 'abbrev'  , type: 'String' , min: 8, max: 60, required: true },
];

export const positionInitialValue = {
    abbrev: "",
    name  : ""
};

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



