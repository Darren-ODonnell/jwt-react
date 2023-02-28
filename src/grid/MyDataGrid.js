import React, {useEffect, useState, useRef, Fragment, useCallback} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {Button, Grid} from "@mui/material";
import './MyDataGrid.css'
import {defaultColDef, refreshPage} from "../common/helper";
import {useAxios} from "../api/ApiService";
import instance from "../api/axios";
import AuthService from "../auth/AuthService";
import {Position} from '../entities/positions'
import {Pitchgrid} from '../entities/pitchgrids'

import {GRID_ROW_DELETE, REPORT_PRINT_PREVIEW} from "../common/globals";
import {Teamsheet} from "../entities/teamsheets";
// import HandlePrintPreview from "../teamsheetComponents/HandlePrintPreview"
// import usePrintPreview from '../teamsheetComponents/usePrintPreview'

import TeamsheetReport from "../teamsheetComponents/TeamsheetReport";
import useConfirm from "../common/useConfirm";
import HandlePrintPreview from "../teamsheetComponents/HandlePrintPreview";
import dropDownData from "../formcomponents/DropDownData";
import FormDialog4 from "./FormDialog4";
// import {GridOptions} from "ag-grid-community";
import ConfirmationModal from "../common/ConfirmationModal";

const MyDataGrid = ({props}) => {
    const [gridApi, setGridApi] = useState(null);
    const gridRef = useRef(null);
    const [paginationEnabled, setPaginationEnabled] = useState(true);

    // used with delete to confirm the record is to be deleted
    const [deleteNode, setDeleteNode] = useState(false)

    const [showConfirm, setShowConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showPrintPreview, setShowPrintPreview] = useState(false);
    // const {isPrintPreview, handlePrintPreview} = usePrintPreview(false);
    // data for form
    const [selectedRow, setSelectedRow] = useState()
    // grid data
    const [rowData, setRowData] = useState([]);
    // form control
    const [open, setOpen] = useState(false);
    // api control
    const [data, error, loading, axiosApi] = useAxios();
    // print preview handler state
    const [filteredData, setFilteredData] = useState([])
    // show Confirmation state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // used with confirmation dialog
    const [confirmation, setConfirmation] = useState(false)
    // export data hook
    // const exportData = useExportData(gridOptions.api);
    // // import data hook
    // const importData = useImportData(gridOptions.api);
    // delete confirm hook

    let message = "";
    let model = [];

    // load up data for dropdowns
    // pass this as a single object , rather than individual collections

    const handleOpen = () => {
        if(open!==true) {
            setOpen( true );
            console.log("Opening Form: ")
        }
    }
    const handleClose = () => {
        if (open !== false) {
            setOpen(false);
            console.log("Closing Form: ")
        }
    };

    const onRowSelected = useCallback((event) => {
        setSelectedRow(event.node.data)
    }, []);

    // const handleSelectionChanged = () => {
    //     if (gridApi != null) {
    //             const selectedNodes = gridApi.getSelectedNodes();
    //             const selectedData = selectedNodes.map((node) => node.data);
    //             setSelectedRow(selectedData[0]);
    //             handleOpen();
    //         // Do something with selected rows...
    //     } else {
    //         console.log("Grid instance is null or undefined");
    //     }
    // };

    const getSelectedRow = () => {
        const selectedNodes = gridApi.getSelectedRows();
        if (selectedNodes.length === 1) {
            setSelectedRow(selectedNodes[0]);
        }
    }

    useEffect(() => {
        if (deleteNode) {
            deleteData(selectedRow)
            setDeleteNode(false)
        }
    })


    const onChange = (e) => {
        const {value, id} = e.target
        // update field with data from user
        // data updated here first, then screen is updated
        setRowData({...rowData, [id]: value})
    }
    const onGridReady = (params) => {
        setGridApi(params.api)
        const gridApi = params.api;
        gridApi.addEventListener('rowSelected', function (event) {
            let selectedRows = gridApi.getSelectedRows();
            setSelectedRow(selectedRows[0])

        });
    }
    const handleEdit = (params) => {
        getSelectedRow()
        handleOpen();
    }

    // returned the filtered data
    const handleFilterChanged = () => {
        model = gridApi.getModel().rowsToDisplay;
        let newFilteredData = model.map(function (m) {
            return m.data
        })
        setFilteredData(newFilteredData)
        console.log("FilteredData-: " + filteredData);
    };
    const handleDelete = (itemId) => {
        getSelectedRow()
        deleteData(selectedRow)
        setShowConfirm(false) // this will trigger a render which the next useEffect will catch this state change
        setShowDeleteModal(false)
        console.log(`Deleting item with id: ${itemId}...`);
    };

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

    const deleteData = (data, error) => {
        console.log("deleting data with id: " + data)
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
                handleClose();
            })
            .catch(err => {
                window.alert(error.message)
                console.log("Error: " + error.message)
                handleClose()
            })
        refreshPage()
        // window.location.reload()
    }
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
            handleClose()
        })        // cancel subscription to useEffect
        return () => (isSubscribed = false)
    }

    const onDelete = () => {
        getSelectedRow()
        setShowDeleteConfirm(true)
    }

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true)
    }


    // in grid
    const EditButton = (params) => {
        return (
            <Button onClick={() => handleEdit(params)}
                    variant="outlined"
                    color="primary"
            > Edit </Button>
        )
    }
    const DeleteButton = (params) => {
        message = GRID_ROW_DELETE;
        return (
            // positions and pitchgrids are reference data and dont need add/delete operations
            showDeleteButton(props.type) ?
                <Button onClick={handleShowDeleteModal}
                        variant="outlined"
                        color="secondary"
                > Delete </Button>
                :
                <div>
                    <Button disabled={true} onClick={() => onDelete(params.data)}
                            variant="outlined"
                            color="secondary"
                    >NO Delete </Button>
                </div>

        )
    }
    // <Button onClick={() => handleConfirm(message, params.data)}
    const handleAdd = (params) => {
        setSelectedRow({...props.initialValue})
        handleOpen(params)
    }

    // above grid
    const AddButton = (params) => {
        return (
            // positions and pitchgrids are reference data and dont need add/delete operations
            showAddButton(params.type) ?
                <Grid align="right">
                    <Button onClick={() => handleAdd(params)}
                            variant="contained"
                            color="primary"
                    >{props.messages.add}</Button>
                </Grid>
                :
                <Grid align="right">
                    <Button disabled={true} onClick={() => handleOpen(params)}
                            variant="contained"
                            color="primary"
                    >NO ADDITION</Button>

                </Grid>

        );
    };

    const showAddButton = (type) => {
        return !(type === Position || type === Pitchgrid)
    }
    const showDeleteButton = (type) => {
        return !(type === Position || type === Pitchgrid)
    }
    const showPrintPreviewButton = (type) => {
        return (type === Teamsheet)
    }
    const PrintPreviewButton = (params) => {
        {  message = REPORT_PRINT_PREVIEW }
        return (
            showPrintPreviewButton(props.type) ?
                <Grid align="left">
                    <Button onClick={(params) => HandlePrintPreview(params, filteredData)}
                            variant="contained"
                            color="primary"
                    >PrintPreview</Button>
                    };
                </Grid>
                :
                <div></div>
        )
    }
    const handlePrintPreviewButton = (params) => {
        return setShowPrintPreview(HandlePrintPreview(params))
    }

    useEffect(() => {
        getData(props.methods.list)
    }, []);

    useEffect(() => {
        setRowData(data);
    }, [data]);

    const commonParams = {}
    const gridParams = {
        ref: gridRef,
        gridApi: gridApi,
        onGridReady: onGridReady,
        onFilterChanged: handleFilterChanged,
        rowData: props.gridLoader(rowData),
        defaultColDef: defaultColDef,
        pagination: true,
        messages: props.messages,
        onRowSelected: onRowSelected,
        paginationPageSize: 10,
        columnDefs: [...props.columnDefs, formActions],
        // onSelectionChanged: handleSelectionChanged,
        rowSelection: "multiple",
    }
    const formParams = {
        // index: props.index,        // check if key above can be used on its own...
        // onClose: handleClose,
        handleClose: handleClose,
        // onSubmit: handleSubmit,
        open: open,
        setOpen: handleOpen,            // dummy value to test index .. props.index previous
        // data: selectedRow,
        rowData: {...selectedRow},
        // values:selectedRow,
        // onChange: onChange,
        methods: props.methods,
        setRowData: setRowData,
        colDefs: props.columnDefs,
        messages: props.messages,
        initialValue: props.initialValue,
        axiosApi: axiosApi,
        entity: props.type,
        loading: loading,
        error: error,
        // location: props.location,

        // dropDownData: dropDownData,
    }

    const togglePagination = () => {
        const pageSize = paginationEnabled ? 1000 : 10;
        setPaginationEnabled(!paginationEnabled);
        gridApi.paginationSetPageSize(pageSize);
    };
    const PaginationButton = () => {
        return (
            <button onClick={togglePagination}>
                {paginationEnabled ? 'Disable Pagination' : 'Enable Pagination'}
            </button>
        )
    }

    return (
        !loading ? <div>
            <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input">
                <Fragment>
                    {showPrintPreview ? <TeamsheetReport props={filteredData}/> : null}
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <PrintPreviewButton {...props} gridApi={gridApi}/>
                        <AddButton {...props}/>
                    </div>
                </Fragment>

                <AgGridReact  {...commonParams} {...gridParams}  />
                <PaginationButton/>
                <FormDialog4   {...formParams}  />

                {/* show delete modal when required by set/reset showModal */}
                <ConfirmationModal
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    setConfirmation={setConfirmation}
                    title="Delete Item"
                    message="Are you sure you want to delete this item?"
                    onConfirm={handleDelete}
                />

            </div>
            {/*<button onClick={exportData}>Export Data</button>*/}

        </div> : <p> Loading...</p>
    )
};

export default MyDataGrid;


