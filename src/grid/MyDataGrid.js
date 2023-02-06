import React, {useEffect, useState, useRef, useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {Button, Grid} from "@mui/material";
import './MyDataGrid.css'
import FormDialog from "./FormDialog";
import {defaultColDef, refreshPage} from "../common/helper";
import {useAxios, useAxios2} from "../api/ApiService";
import instance from "../api/axios";
import AuthService from "../auth/AuthService";
import {Position} from '../entities/positions'
import {Pitchgrid} from '../entities/pitchgrids'

import {METHODS} from "../common/globals";
import {COMPETITION_URLS} from "../entities/competitions";
import {PLAYER_URLS} from "../entities/players";
import {CLUB_URLS} from "../entities/clubs";
import {PITCH_GRID_URLS} from "../entities/pitchgrids";
import {STAT_NAME_URLS} from "../entities/statnames";
import {POSITION_URLS} from "../entities/positions";


const MyDataGrid = ({props}) => {
    const gridRef = useRef(); // Optional - for accessing Grid's API

    const [gridApi, setGridApi] = useState(null);
    // grid data
    const [rowData, setRowData] = useState([]);

    const [changed, setChanged] = useState();
    // data for form
    const [formData, setFormData] = useState(props.initialValue)
    // form control
    const [open, setOpen] = useState(false);
    // api control
    const [data, error, loading, axiosApi] = useAxios();

    // load up data for dropdowns
    const competitions = useAxios2(COMPETITION_URLS.list);
    const players = useAxios2(PLAYER_URLS.list);
    const clubs = useAxios2(CLUB_URLS.list);
    const positions = useAxios2(POSITION_URLS.list);
    const pitchgrids = useAxios2(PITCH_GRID_URLS.list);
    const statnames = useAxios2(STAT_NAME_URLS.list);


    function getData({method, url}) {
        // clean up controller
        let isSubscribed = true;
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);
        axiosApi({
            axiosInstance: instance,
            method: method,
            url: url,
        }).then(() => {

        }).catch(err => {

            setOpen(false)
        })        // cancel subscription to useEffect
        return () => (isSubscribed = false)
    }

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
        setGridApi(params.api)
    }
    const handleEdit = (props) => {
        handleOpen();
        setFormData({...props.data});
    }
    const handleDelete = (id) => {
        setOpen(false);
        const confirm = window.confirm("Are you sure, you want to delete this row", id)
        if (confirm) {
            deleteData(id)
        }
    }
    const deleteData = ({data, error}) => {
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
                data                = response.data
                setOpen(false)
            })
            .catch(err => {
                error               = err.message;
                setOpen(false)
            })
        refreshPage()
        // window.location.reload()
    }

    const showAddButton = (type) => {
        let b =(type===Position || type===Pitchgrid)
        return !b;
        // return (type!==Position || type!==Pitchgrid)
    }
    const showDeleteButton = (type) => {
        let b =(type===Position || type===Pitchgrid)
        return !b;
    }

    useEffect(() => {
        getData(props.methods.list)

    }, []);

    const AddButton = (params) => {
        return (
            showAddButton(params.type) ?
                <Grid align="right">
                    <Button onClick={() => handleOpen(params)}
                            variant="contained"
                            color="primary"
                    >{props.messages.add}</Button>
                    };
                </Grid>
                :
                <Grid align="right">
                    <Button disabled={true} onClick={() => handleOpen(params)}
                            variant="contained"
                            color="primary"
                    >NO ADDITION</Button>
                    };
                </Grid>

        )
    }

    const formActions = {
        headerName: 'Actions',
        field: 'id',
        width: 200,
        editable: false,
        pinned: 'right',
        filter: false,
        sortable: false,
        lockPosition: 'right',
        cellRenderer: (params) => {
            return (
                <>
                    <EditButton {...params} />
                    <DeleteButton {...params}/>
                </>
            )
        }
    };
    const EditButton = (params) => {

        return (

            <Button onClick={() => handleEdit(params)}
                    variant="outlined"
                    color="primary"
            > Edit </Button>
        )
    }
    const DeleteButton = (params) => {
        return (
            showDeleteButton(props.type) ?
                <Button onClick={() => handleDelete(params)}
                        variant="outlined"
                        color="secondary"
                > Delete </Button>
                :
                <div>
                    <Button disabled={true} onClick={() => handleDelete(params)}
                            variant="outlined"
                            color="secondary"
                    >NO Delete </Button>
                </div>

        )
    }
    useEffect(() => {
        setRowData(data)
        console.log(data[0])
    }, [data]);

    return (

        !loading ? <div>
            <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input">
                <AddButton {...props}/>
                <AgGridReact
                    rowData={props.gridLoader(rowData)}
                    // onGridReady={onGridReady}
                    // gridApi={gridApi}
                    defaultColDef={defaultColDef}
                    // pagination={true}
                    // suppressRowDrag={true}
                    columnDefs={[...props.columnDefs, formActions]}
                />
                <FormDialog
                    gridApi={gridApi}
                    key={props.index}
                    setData={setFormData}
                    open={open}
                    onClose={handleClose}
                    index={props.index}
                    data={formData}
                    handleClose={handleClose}
                    setOpen={setOpen}
                    update={props.gridLoader.update}
                    onChange={onChange}
                    actions={props.actions}
                    methods={props.methods}
                    colDefs={props.columnDefs}
                    messages={props.messages}
                    formData={formData[1]}             // dummy value to test index .. props.index previous
                    setFormData={setFormData}
                    getData={getData}
                    initialValue={props.initialValue}
                    axiosApi={axiosApi}
                />

            </div>
        </div> : <p> Loading...</p>
    )
};

export default MyDataGrid;


// let commonProps = {
//     key: props.index,
//     setData: setFormData,
//     open: open,
//     // onClose   : handleClose,
//     data: rowData,
//     // handleClose  : handleClose,
//     setOpen: setOpen,
//     update: props.gridLoader.update,
//     onChange: onChange,
//     // // actions  :props.actions,
//     methods: props.methods,
//     colDefs: props.formColDefs,
//     messages: props.messages,
//     formData: formData,
//     setFormData: setFormData,
//     getData: getData,
//     initialValue: props.initialValue,
//     // // useAxios params
//     axiosApi: axiosApi,
//
// };





