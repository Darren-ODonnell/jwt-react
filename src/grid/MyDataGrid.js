import React, {  useState } from 'react';
import {  AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './MyDataGrid.css'
import { Button, Grid } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import { FormDialog} from "./FormDialog";
import { defaultColDef } from "../common/helper";
import { FormEditDialog } from "./FormEditDialog";

const MyDataGrid = (props) => {

    const [ , setGridApi ]  = useState(null);
    const [ rowData , setRowData ]  = useState(props.initialValue);
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
    const handleClose =         () => {
        setOpen(false);
        // setFormData(props.initialValue);
    };

    const handleEdit = (props) => {
        setOpen( true );
        setFormData( props.data );
        setRowData( props.data );
        return <FormEditDialog
            open      = { open } handleClose  = { handleClose }
            setOpen   = { setOpen }
            data      = { rowData } onChange  = { onChange }
            actions   = { props.actions }
            // handleFormSubmit={()=>handleFormSubmit(formData, actions )}
            colDefs   = { props.formColDefs }
            messages  = { props.messages }
            addButton = { addEntityButton }
        />

    }
    const handleDelete = (id) => {
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

    const onGridReady =  (params)  => {  setGridApi(params)      }

    const onChange = (e) => {
        const { value, id } = e.target
        setFormData({ ...formData, [id]: value })

    }
    console.log(data2);
    if (error !== null) {   return <ErrorMessage message={error.message}/>;   }

    const loading = <>Loading...</>;

    // if(isLoaded)
    //     setRowData( buildNewRows( data ));

    // debugger;
    // if(isLoaded) {
    //     setRowData (props.actions.build(data));
    // }


    // const formEditDialog = () => {
    //     return (
    //         <FormDialog
    //             open = { open }
    //             handleClose = { handleClose }
    //             data = { formData }
    //             onChange = { onChange }
    //             handleFormSubmit = { handleFormSubmit }
    //             colDefs = { props.formColDefs }
    //             messages = { props.messages }
    //         />
    //     );
    // }

    const myButtons = (params) => {
        return  (
            <div>
                <Button variant = "outlined" color = "primary"   onClick = {()=>handleEdit( params )}> Edit </Button>
                <Button variant = "outlined" color = "secondary" onClick = {()=>handleDelete( params )}> Delete </Button>
            </div>
        )
    }

   let actions  = {
        headerName: 'Actions',
        field     : 'id',
        width     : 200,
        editable  : false,
        pinned    : 'right',
        filter    : false,
        sortable  : false,
        cellRenderer:  (params) => myButtons(params)

    };

    const addEntityButton = () => {
        return (
            <Grid align="right">
                <Button onClick={ () => setOpen(true) }
                        variant = "contained"
                        color   = "primary"
                >{ props.messages.add }</Button>
            </Grid>
        )
    }
    // debugger;

    console.log(rowData)

    return (
        <div >

            <FormDialog
                open      = {open} handleClose  = {handleClose}
                setOpen   = {setOpen}
                data      = {rowData} onChange  = {onChange}
                actions   = {props.actions}
                // handleFormSubmit={()=>handleFormSubmit(formData, actions )}
                colDefs   = {props.formColDefs}
                messages  = {props.messages}
                addButton = {addEntityButton}
            />

            {/*<Grid align="right">*/}
            {/*    <Button variant="contained" color="primary" onClick={()=>handleClickOpen(setOpen)}>{props.messages.add}</Button>*/}
            {/*</Grid>*/}
            <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input"  >
                <AgGridReact
                    defaultColDef              = {defaultColDef}
                    pagination                 = {true}
                    rowData                    = {data2}
                    animateRows                = {true}
                    // editType="fullRow" - one cell at a time
                    alwaysShowHorizontalScroll = {true}
                    suppressHorizontalScroll   = {false}
                    suppressClickEdit          = {false}
                    columnDefs                 = {[...props.gridColDefs, actions]}
                    onGridReady                = {onGridReady} >
                </AgGridReact >
            </div>
        </div>
    )
};

export default MyDataGrid;






