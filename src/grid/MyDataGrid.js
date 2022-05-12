import React, { useRef, useState } from 'react';
import {  AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './MyDataGrid.css'
import { Button, Grid } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import { FormDialog, FormDialog2 } from "./FormDialog";
import { defaultColDef } from "../common/helper";
import FormEditDialog from "./FormEditDialog";

const MyDataGrid = (props) => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [ , setGridApi ]  = useState(null);
    const [ formData, setFormData ] = useState(props.initialValue)
    const [ open    , setOpen ]     = useState(false);

    // const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    // const gridStyle = useMemo(() => ({ height: '600', width: '1200' }), []);

    // const handleClickOpen =     (setOpen) => {
    //     // setRowData(props.data);
    //     // setFormData(props.data);
    //
    //     setOpen(true);
    //
    // };
    const handleClose = () => {
        setOpen(false);
        // setFormData(props.initialValue);
    };
    const onChange = (e) => {
        const { value, id } = e.target
        // update field with data from user
        // data updated here first, then screen is updated
        setFormData({ ...formData, [id]: value })
    }
    const onGridReady = (params)  => {  setGridApi(params)      }
    const handleEdit = (props) => {
        setOpen( true );
        setFormData( {...props.data} );
        console.log("Data:", props.data)
        console.log("formData:", props.formData)

    }
    const handleDelete = (id) => {
        setOpen(false);
        const confirm = window.confirm("Are you sure, you want to delete this row", id)
        if (confirm) {
            props.actions.delete(id)
                .then(resp => props.actions.list())
        }
    }

    const buildNewRows = data => {
        let newRow = {}

        data.map(row => {
            return newRow = {
                fixtureId      : row.fixtureId,
                competitionName: row.competition.name,
                homeTeamName   : row.awayTeam.name,
                awayTeamName   : row.homeTeam.name,
                fixtureDate    : row.fixtureDate,
                fixtureTime    : row.fixtureTime,
                season         : row.season,
                round          : row.round
            }

        })
        return data;
    }

    const { data2, data, error, isLoaded } = props.actions.list()

    if (error !== null) {   return <ErrorMessage message={error.message}/>;   }

    const loading = <>Loading...</>;

    // if(isLoaded)
    //     setRowData( buildNewRows( data ));

    // debugger;
    // if(isLoaded) {
    //     setRowData (props.actions.build(data));
    // }


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
    const actions  = {
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
    const addButton = () => {
        return (
            <Grid align="right">
                <Button onClick={ () => setOpen(true) }
                        variant = "contained"
                        color   = "primary"
                >{ props.messages.add }</Button>
            </Grid>
        )
    }

    return (
        <div >
            { addButton() }

            <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input"  >
                <AgGridReact
                    ref           = { gridRef }
                    defaultColDef = { defaultColDef }
                    pagination    = { true }
                    rowData       = { data2 }
                    animateRows   = { true }
                    // editType="fullRow" - one cell at a time
                    alwaysShowHorizontalScroll = { true }
                    suppressHorizontalScroll   = { false }
                    suppressClickEdit          = { false }
                    columnDefs                 = { [...props.gridColDefs, actions] }
                    onGridReady                = { onGridReady } />

            </div>

            <FormDialog2
                open        = { open }
                handleClose = { handleClose }
                setOpen     = { setOpen }
                data        = { formData }
                onChange    = { onChange }
                actions     = { props.actions }
                //handleFormSubmit={()=>handleFormSubmit(formData, actions )}
                colDefs     = { props.formColDefs }
                messages    = { props.messages }
                formData    = { formData }
                setFormData = { setFormData }
                initialValue = {props.initialValue}

            />


        </div>
    )
};

export default MyDataGrid;






