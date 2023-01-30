import React, { useEffect, useRef, useState } from 'react';
import  { AgGridReact }  from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import moment from "moment";
import { Button, Grid } from "@mui/material";
import './MyDataGrid.css'
import FormDialog from "./FormDialog";
import { defaultColDef, refreshPage} from "../common/helper";
import { useAxios } from "../api/ApiService";
import instance from "../api/axios";
import AuthService from "../auth/AuthService";
import { Position } from '../entities/positions'
import { Pitchgrid } from '../entities/pitchgrids'

import {} from './Forms';
import {GetData} from "../api/GetData";

const MyDataGrid = ({props}) => {
    // const gridRef = useRef(); // Optional - for accessing Grid's API
    const [, setGridApi] = useState(null);

    // grid control
    // const [rowData, setRowData] = useState();

    // const [changed, setChanged] = useState();
    const [formData, setFormData] = useState(props.initialValue)
    // form control
    const [open, setOpen] = useState(false);
    // api control
    const [data, error, loading, axiosApi] = useAxios();

    let loader = true;

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        // setFormData(data.initialValue);
    };
    const onChange = (e) => {
        const {value, id} = e.target
        // update field with data from user
        // data updated here first, then screen is updated
        console.log(value + " - " + id)
        setFormData({...formData, [id]: value})
    }
    const onGridReady = (params) => {
        setGridApi(params)
    }
    const handleEdit = (props) => {
        handleOpen();
        setFormData({...props.data});
        console.log("Data:", props.data)
        console.log("formData:", props.formData)
    }
    const handleDelete = (id) => {
        setOpen(false);
        const confirm = window.confirm("Are you sure, you want to delete this row", id)
        if (confirm) {
            deleteData(id)
        }
    }
    const deleteData = ({ data, error  }) => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);

        const configObj = {
            axiosInstance: instance,
            ...props.methods.delete,
            requestConfig: {
                data: {data}
            }
        }

        axiosApi(configObj)
            .then(response => {
                data = response.data
                setOpen(false)
            })
            .catch(err => {
                error = err.message;
                setOpen(false)
            })
        refreshPage()
        // window.location.reload()
    }

    const getData = ( { method, url }) => {
        // clean up controller
        let isSubscribed = true;
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken( user.accessToken );
        axiosApi({
            axiosInstance: instance,
            method: method,
            url: url
        }).then (()=> {

        })
        // cancel subscription to useEffect
        return () => (isSubscribed = false)
    }

    const showAddButton = (type) => {
        let b =(type===Position || type===Pitchgrid)
        return !b;
        // return (type!==Position || type!==Pitchgrid)
    }
    const showDeleteButton = (type) => {
        let b =(type===Position || type===Pitchgrid)
        return !b;

        // return (type!==Position || type!==Pitchgrid)
    }

    useEffect(()=>{

        getData(props.methods.list)

    }, []);

    const AddButton = (params) => {
        return (
            showAddButton(params.type) ?
                <Grid align="right">
                    <Button onClick={() => handleOpen(params)}
                        variant = "contained"
                        color   = "primary"
                    >{ props.messages.add }</Button>
                    };
                </Grid>
                :
                <Grid align="right">
                    <Button disabled="true" onClick={() => handleOpen(params)}
                        variant = "contained"
                        color   = "primary"
                    >NO ADDITION</Button>
                    };
                </Grid>

        )
    }
    const EditButton = (params) => {
        return (
            <Button  onClick = {()=>handleEdit( params )}
                     variant = "outlined"
                     color   = "primary"
            > Edit </Button>
        )
    }
    const DeleteButton = (params) => {
        return (
            showDeleteButton(props.type) ?
                <Button  onClick = {()=>handleDelete( params )}
                         variant = "outlined"
                         color   = "secondary"
                > Delete </Button>
                :
                <div>
                <Button disabled="true" onClick = {()=>handleDelete( params )}
                         variant = "outlined"
                         color   = "secondary"
                >NO Delete </Button>
                </div>

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
        lockPosition : 'right',
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
            {console.log("MyDataGrid loading...")}
            <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input">
                <AddButton {...props}/>
                <AgGridReact
                    // ref                        = { gridRef }
                    defaultColDef              = { defaultColDef }
                    pagination                 = { true }
                    suppressRowDrag            = { true }
                    columnDefs                 = { [...props.gridColDefs   , formActions] }
                    onGridReady                = { onGridReady }
                    // rowData                    = { props.gridLoader(formData) }
                    rowData                    = { props.gridLoader(data) }
                    // animateRows                = { true }
                    // alwaysShowHorizontalScroll = { true }
                    // suppressClickEdit          = { true }

                />

                {!props.gridLoader.dropDown} ?

                <FormDialog
                    key = {props.index}
                    setData      = {setFormData}
                    open         = {open}
                    // onClose      = {handleClose}
                    data         = {formData}
                    // handleClose  = {handleClose}
                    setOpen      = {setOpen}
                    update       = {props.gridLoader.update}
                    onChange     = {onChange}
                    // // actions      = { props.actions }
                    methods      = {props.methods}
                    colDefs      = {props.formColDefs}
                    messages     = {props.messages}
                    formData     = {formData}
                    setFormData  = {setFormData}
                    getData      = { getData }
                    initialValue = {props.initialValue}
                    // // useAxios params
                    axiosApi     = {axiosApi}
                    // error        = {error}
                    // loading      = {loading}
                    // setChanged   = {setChanged}
                    // changed      = {changed}

                />
                :
                <FormDialog
                    key          = {props.index}
                    setData      = {setFormData}
                    open         = {open}
                    // onClose      = {handleClose}
                    data         = {formData}
                    // handleClose  = {handleClose}
                    setOpen      = {setOpen}
                    update       = {props.gridLoader.update}
                    onChange     = {onChange}
                    // // actions      = { props.actions }
                    methods      = {props.methods}
                    colDefs      = {props.formColDefs}
                    messages     = {props.messages}
                    formData     = {formData}
                    setFormData  = {setFormData}
                    getData      = { getData }
                    initialValue = {props.initialValue}
                    // // useAxios params
                    axiosApi     = {axiosApi}
                    // error        = {error}
                    // loading      = {loading}
                    // setChanged   = {setChanged}
                    // changed      = {changed}


                />
            </div>
        </div> : <p> Loading...</p>
    )
};

export default MyDataGrid;




