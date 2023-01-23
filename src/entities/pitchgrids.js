import { Statname, METHODS, PITCH_GRID_URLS, Pitchgrid } from "../common/globals";
import { addMessage, copyFormColDefs, copyGridColDefs } from "../common/helper";

const table = {name:Pitchgrid}

export const pitchgridColumnDefs = [
    // { headerName: 'Abbreviation', field: 'id', type: 'String' , min: 8, max: 60, required: true },
    { headerName: 'Pitchgrid'   , field: 'name'  , type: 'String' , min: 8, max: 60, required: true },
];

export const pitchgridInitialValue = {
    abbrev: "",
    name  : ""
};

const apiRequests = {
    list    : {method: METHODS.GET   , url: PITCH_GRID_URLS.list},
    findById: {method: METHODS.GET   , url: PITCH_GRID_URLS.findById},
    update  : {method: METHODS.POST  , url: PITCH_GRID_URLS.update},
    add     : {method: METHODS.PUT   , url: PITCH_GRID_URLS.add},
    delete  : {method: METHODS.DELETE, url: PITCH_GRID_URLS.delete}
}

const gridLoader = (data) => {
    let newData = [];
    data.forEach(row => {
        const newRow = {
            // id: row.id,
            abbrev: row.id,
            name  : row.name
        }
        newData.push(newRow)
    })
    return newData;
}


export const pitchgridData = {
    messages    : addMessage(Pitchgrid),
    type        : Pitchgrid,
    initialValue: pitchgridInitialValue,
    columnDefs  : pitchgridColumnDefs,
    formColDefs : copyFormColDefs( pitchgridColumnDefs ), // form column definitions
    gridColDefs : copyGridColDefs( pitchgridColumnDefs,table ), // Grid column definitions
    methods     : apiRequests,
    gridLoader  : gridLoader
};



