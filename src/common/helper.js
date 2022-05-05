

export const addMessage = (  entityName ) => {
    return {
        add: "Add " + entityName,
        update: "Edit " + entityName,
        create: "Create New " + entityName,
    };
}

const id = { headerName: 'id',  field: 'id',  width:80,  editable: false, filter: false, };

export const copyGridColDefs = ( columnDefs ) => {
    const newColDefs = columnDefs.map( ( prop ) => {
        return {
            headerName: prop.headerName,
            field: prop.field,
            width: 150,
        }
    } );

    // add grid actions update and delete to end of row and id defs to start of row
    // return [id,...newColDefs, actions];
    return [id,...newColDefs];

}

// move to FormDialog
export const copyFormColDefs = ( columnDefs ) => {
    return columnDefs.map( ( prop ) => {
        return {
            headerName: prop.headerName,
            type: prop.type,
            min: prop.min,
            max: prop.max,
            required: prop.required
        }
    } );
}

export const defaultColDef = {
    sortable:true,
    editable: true,
    filter: true,
    cellEditorPopup: true,
    floatingFilter: true,
    resizable: true,
    // flex: 1,
    cellEditorParams: {
        maxLength: 128,
        rows: 2,
        cols: 50
    },
    cellEditor: 'agLargeTextCellEditor'
};

export function isEmptyObject(obj){
    const array = JSON.stringify(obj);
    const state = (array === '{}') || (array === "null");
    return state;
}