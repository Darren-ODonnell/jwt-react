import React, {  useRef, useState } from 'react';
import {  AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './MyDataGrid.css'
import { Button, Grid } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import { FormDialog } from "./FormDialog";
import { defaultColDef } from "../common/helper";


const MyDataGrid = ({props}) => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [ , setGridApi ]  = useState(null);
    const [ formData, setFormData ] = useState( props.initialValue)
    const [ open    , setOpen ]     = useState(false);

    const handleOpen = () => {
        setOpen( true );
    }
    const handleClose = () => {
        setOpen(false);
        // setFormData(data.initialValue);
    };
    const onChange = (e) => {
        const { value, id } = e.target
        // update field with data from user
        // data updated here first, then screen is updated
        setFormData({ ...formData, [id]: value })
    }
    const onGridReady = (params)  => {  setGridApi(params)      }
    const handleEdit = (props) => {
        handleOpen();
        setFormData( {...props.data} );
        console.log("Data:", props.data)
        console.log("formData:", props.formData)
    }
    const handleDelete = (id) => {
        setOpen(false);
        const confirm = window.confirm("Are you sure, you want to delete this row", id)
        if (confirm) {
            props.actions.delete(id)
                .then(props.actions.list())
        }
    }


    const { data2, error, isLoaded, setData } = props.actions.list()

    props.actions.list();

    if( error !== null ) { return <ErrorMessage message={ error.message }/>; }

    const addButton = (params) => {
        return (
            <Grid align="right">
                <Button onClick={() => handleOpen(params)}
                        variant = "contained"
                        color   = "primary"
                >{ props.messages.add }</Button>
            </Grid>
        )
    }
    const editButton = (params) => {
        return (
            <Button  onClick = {()=>handleEdit( params )}
                     variant = "outlined"
                     color = "primary"
            > Edit </Button>
        )
    }
    const deleteButton = (params) => {
        return (
            <Button  onClick = {()=>handleDelete( params )}
                     variant = "outlined"
                     color = "secondary"
            > Delete </Button>
        )
    }
    const formActions  = {
        headerName: 'Actions',
        field     : 'id',
        width     : 200,
        editable  : false,
        pinned    : 'right',
        filter    : false,
        sortable  : false,
        cellRenderer:  (params) => {
            return (
                <>
                { editButton( params ) }
                { deleteButton( params ) }
                </>
            )
        }
    };

    return (
        <div >
            { addButton() }
            <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input"  >
                <AgGridReact
                    ref           = { gridRef }
                    defaultColDef = { defaultColDef }
                    pagination    = { true }
                    rowData       = { data2 }
                    suppressHows  = { true }
                    columnDefs    = { [...props.gridColDefs, formActions] }
                    onGridReady   = { onGridReady }
                    animateRoowHorizontalScroll = { true }
                    alwaysShrizontalScroll      = { false }
                    suppressClickEdit           = { false }
                />

            </div>
            <FormDialog
                setData     = { setFormData }
                data        = { formData }
                open        = { open }
                handleClose = { handleClose }
                setOpen     = { setOpen }
                onChange    = { onChange }
                actions     = { props.actions }
                colDefs     = { props.formColDefs }
                messages    = { props.messages }
                formData    = { formData }
                setFormData = { setFormData }
                initialValue = { props.initialValue }
            />
        </div>
    )
};

export default MyDataGrid;






