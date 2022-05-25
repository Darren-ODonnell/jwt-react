import React, { useEffect, useRef, useState } from 'react';
import {  AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './MyDataGrid.css'
import { Button, Grid} from "@mui/material";
import  FormDialog  from "./FormDialog";
import { defaultColDef } from "../common/helper";
import { useAxios } from "../api/ApiService";
import instance from "../api/axios";
import AuthService from "../auth/AuthService";

const MyDataGrid = ({props}) => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [ , setGridApi ]  = useState(null);
    const [ formData, setFormData ] = useState( props.initialValue)
    const [ open    , setOpen ]     = useState(false);
    const [ data, error, loading, axiosFetch] = useAxios();

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
            props.actions.deleteById(id)
                .then(props.actions.list())
        }
    }

    const getData = ( { method, url }) => {
        // clean up controller
        let isSubscribed = true;
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken( user.accessToken );
        axiosFetch( {
            axiosInstance: instance,
            method: method,
            url: url
        }).then (()=> {
            setFormData([...data]);
        })
        // cancel subscription to useEffect
        return () => (isSubscribed = false)
    }


    useEffect(()=>{
        getData(props.methods.list);
        setFormData([...data]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const AddButton = (params) => {
        return (
            <Grid align="right">
                <Button onClick={() => handleOpen(params)}
                        variant = "contained"
                        color   = "primary"
                >{ props.messages.add }</Button>
            </Grid>
        )
    }
    const EditButton = (params) => {
        return (
            <Button  onClick = {()=>handleEdit( params )}
                     variant = "outlined"
                     color = "primary"
            > Edit </Button>
        )
    }
    const DeleteButton = (params) => {
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
                    <EditButton {...params} />
                    <DeleteButton {...params}/>
                </>
            )
        }
    };

    return (
        !loading  ? <div >
             <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input"  >
                <AddButton {...props}/>
                <AgGridReact
                    ref             = { gridRef }
                    defaultColDef   = { defaultColDef }
                    pagination      = { true }
                    rowData         = { props.gridLoader(data) }
                    suppressRowDrag = { true }
                    columnDefs      = { [...props.gridColDefs, formActions] }
                    onGridReady     = { onGridReady }
                    animateRows     = { true }
                    alwaysShowHorizontalScroll = { false }
                    suppressClickEdit          = { false }
                 />
                <FormDialog
                    setData      = { setFormData }
                    data         = { formData }
                    open         = { open }
                    onClose      = { handleClose }
                    handleClose  = { handleClose }
                    setOpen      = { setOpen }
                    onChange     = { onChange }
                    // actions      = { props.actions }
                    methods      = { props.methods }
                    colDefs      = { props.formColDefs }
                    messages     = { props.messages }
                    formData     = { formData }
                    setFormData  = { setFormData }
                    initialValue = { props.initialValue }
                    axiosFetch   = { axiosFetch }
                />
            </div>
        </div> : <p> Loading...</p>

    )
};

export default MyDataGrid;


//   const [ data, error, loading, axiosFetch] = useAxios();



