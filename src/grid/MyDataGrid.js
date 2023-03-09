import React, {useEffect, useState, useRef, Fragment, useCallback} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, FormControl, Grid, MenuItem, Select } from "@mui/material";
import './MyDataGrid.css'
import { defaultColDef } from "../common/helper";
import {deleteData, getData, useAxios} from "../api/ApiService";
import {Position} from '../entities/positions'
import {Pitchgrid} from '../entities/pitchgrids'
import {GRID_ROW_DELETE, REPORT_PRINT_PREVIEW} from "../common/globals";
import { loadDataForTeamsheet, Teamsheet } from "../entities/teamsheets";
import TeamsheetReport from "../teamsheetComponents/TeamsheetReport";
import FormDialog4 from "./FormDialog4";
import ConfirmationModal from "../common/ConfirmationModal";
import ReportModal from "../teamsheetComponents/ReportModal";
import { useTheme } from '@mui/material/styles';
import ImportExport from "../common/ImportExport";

const MyDataGrid = ({props}) => {
    const [gridApi, setGridApi] = useState(null);
    const gridRef = useRef(null);
    const [paginationEnabled, setPaginationEnabled] = useState(true);

    // used with delete to confirm the record is to be deleted
    const [deleteNode, setDeleteNode] = useState(false)

    // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [showPrintPreview, setShowPrintPreview] = useState(false);
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
    // show Delete Confirmation state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // used with Filter Confirmation modal
    const [showFilterModal, setShowFilterModal] = useState(false);
    // used with delete confirmation modal
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    // handling the teamsheet data to bew printed
    const [reportData, setReportData] = useState({})
    // open/close reportModal for printing
    const [modalOpen, setModalOpen] = useState(false);

    const [exportType, setExportType] = useState('CSV');

    const theme = useTheme();
    // export data hook
    // const exportData = useExportData(gridOptions.api);
    // // import data hook
    // const importData = useImportData(gridOptions.api);
    // delete confirm hook



    let message = "";
    let model = [];

    const handleOpen  = useCallback(() => {    setOpen(true);    }, []);
    const handleClose = useCallback(() => {    setOpen(false);   }, []);
    const onRowSelected = useCallback((event) => {  setSelectedRow(event.node.data);  }, []);

    const onChange = useCallback((e) => {
        const {value, id} = e.target;
        setRowData({...rowData, [id]: value});
    }, [rowData]);

    const onGridReady = useCallback((params) => {
        setGridApi(params.api);
        const gridApi = params.api;
        gridApi.addEventListener('rowSelected', function (event) {
            let selectedRows = gridApi.getSelectedRows();
            setSelectedRow(selectedRows[0]);
        });
    }, []);


    // returned the filtered data
    const handleFilterChanged = useCallback(() => {
        // capture the data when a filter is set on the grid
        // model = gridApi
        model = gridApi.getModel().rowsToDisplay;
        let newFilteredData = model.map(function (m) {
            return m.data
        })
        setFilteredData(newFilteredData)

        console.log("FilteredData-: " + filteredData);
    }, [gridApi, filteredData]);

    const getSelectedRow = useCallback(() => {
        const selectedNodes = gridApi.getSelectedRows();
        if (selectedNodes.length === 1) {
            setSelectedRow(selectedNodes[0]);
        }
    }, [gridApi]);

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

    // const deleteData = (data, error) => {
    //     console.log("deleting data with id: " + data)
    //     const user = AuthService.getCurrentUser();
    //     AuthService.setAuthToken(user.accessToken);
    //
    //     const configObj = {
    //         axiosInstance: instance,
    //         ...props.methods.delete,
    //         requestConfig: {
    //             data: {data}
    //         }
    //     }
    //
    //     axiosApi(configObj)
    //         .then(response => {
    //             handleClose();
    //         })
    //         .catch(err => {
    //             window.alert(error.message)
    //             console.log("Error: " + error.message)
    //             handleClose()
    //         })
    //     refreshPage()
    //     // window.location.reload()
    // }
    // function getData({method, url}) {
    //     // clean up controller
    //     let isSubscribed = true;
    //     const user = AuthService.getCurrentUser();
    //     AuthService.setAuthToken(user.accessToken);
    //     axiosApi({
    //         axiosInstance: instance,
    //         method: method,
    //         url: url,
    //     }).then(() => {
    //
    //     }).catch(err => {
    //         handleClose()
    //     })        // cancel subscription to useEffect
    //     return () => (isSubscribed = false)
    // }

    const handleCloseModal      = () => { setModalOpen(false);    };

    // Add button in grid
    const EditButton = (params) => {
        return (
            <Button onClick={() => handleEdit(params)}
                    variant="outlined"
                    color="primary"
            > Edit </Button>
        )
    }
    const handleEdit = useCallback(() => {
        getSelectedRow();
        handleOpen();
    }, [getSelectedRow, handleOpen]);

    // Delete Button in Grid
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
                    <Button disabled={true}
                            variant="outlined"
                            color="secondary"
                    >NO Delete </Button>
                </div>

        )
    }

    const handleShowDeleteModal = () => { setShowDeleteModal(true)    }
    // <Button onClick={() => handleConfirm(message, params.data)}



    // Add Button
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
    const handleAdd = (params) => {
        setSelectedRow({...props.initialValue})
        handleOpen(params)
    }
    // when to show buttons
    const showAddButton          = (type) => { return !(type === Position || type === Pitchgrid)   }
    const showDeleteButton       = (type) => { return !(type === Position || type === Pitchgrid)   }
    const showPrintPreviewButton = (type) => { return  (type === Teamsheet) }

    // print preview
    const PrintPreviewButton = (params) => {
        message = REPORT_PRINT_PREVIEW
        return (
            showPrintPreviewButton(props.type) && (
                <Grid align="left">
                    <Button onClick={(params) => handlePrintModal(params, filteredData)}
                            variant="contained"
                            color="primary"
                    >PrintPreview</Button>
                    };
                </Grid>
            )
        )
    }
    const handlePrintModal = () => { // display the report modal if a filter has been applied
        if (filteredData === [] || filteredData.length == 0) {
            console.log("Filtered Data is Empty")
            message = "Filter Teamsheet to a specific Fixture Date using Grid"
            setShowFilterModal(true)
            setModalOpen(false);
        } else {
            if (filteredData.length <= 30) {
                setShowFilterModal(false)
                setReportData(loadDataForTeamsheet(filteredData))
                setModalOpen(true);
            } else {
                setShowFilterModal(true)
                setModalOpen(false);
            }
        }
    };

    // Pagination
    const togglePagination = () => {
        const pageSize = paginationEnabled ? 1000 : 10;
        setPaginationEnabled(!paginationEnabled);
        gridApi.paginationSetPageSize(pageSize);
    };
    const PaginationButton = () => {
        return (
            <Button onClick={togglePagination}>
                {paginationEnabled ? 'Disable Pagination' : 'Enable Pagination'}
            </Button>
        )
    }

    // dummy method for now - this needs to be setup in each entity file
    const validate = (values) => {
        return true
    }


    useEffect(() => { setRowData(data);    }, [data]);
    useEffect(() => {
        getData(props.methods.list, axiosApi, handleClose)

    }, []);
    useEffect(() => {
        if (deleteNode) {
            console.log("DeleteNode:"+selectedRow)
            // deleteData(selectedRow);
            setDeleteNode(false);
        }
    }, [deleteNode, selectedRow, deleteConfirmation]);

    // render parameters
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
        onClose: handleClose,
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
        validate: validate,
        // location: props.location,

        // dropDownData: dropDownData,
    }

    const handleDeleteConfirmation = (value) => {
        setDeleteConfirmation(true)
    }


    return (
        !loading ? <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input">
            {/* Use fragment to Keep buttons on same line above grid */}
            <Fragment>
                {showPrintPreview ? <TeamsheetReport props={filteredData}/> : null}
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <PrintPreviewButton {...props} gridApi={gridApi}/>
                    {exportType && setExportType && <ImportExport  exportType={exportType} setExportType={setExportType}/> }
                    <AddButton {...props}/>
                </div>
            </Fragment>

            {/* Show Grid - always shown*/}
            <AgGridReact  {...commonParams} {...gridParams}  />
            {/* Show pagination button below grid */}
            <PaginationButton/>
            {/* show Import/Export Buttons here... */}
            {/*<button onClick={exportData}>Export Data</button>*/}

            {/* Popup form triggerd by open */}
            <FormDialog4   {...formParams}  />
            {/* show delete modal when required by set/reset showModal */}
            <ConfirmationModal
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                setConfirmation={handleDeleteConfirmation}
                title="Delete Item"
                message="Are you sure you want to delete this item?"
                                                                                                                                                                                                                                                                      type ="Delete"
            />
            {/* Printing Teamsheet*/}
            {/* Filter Popup Modal - pops up if too many records selected in grid for team-sheet*/}
            <ConfirmationModal
                showModal={showFilterModal}
                setShowModal={setShowFilterModal}
                setConfirmation={true}
                title="Filter By Fixture Date"
                message="Use Fixture Date Filter to select the teamsheet for a single fixture"
                type ="Filter"
            />
            {/* Show print preview of Teamsheet */}
            <ReportModal open={modalOpen} onClose={handleCloseModal} data={reportData}/>
            {/* Delete Record if confirmation good */}
            { deleteConfirmation && deleteData(selectedRow, error, props, axiosApi, handleClose) && setDeleteConfirmation(false) }

        </div> : <p> Loading...</p>
    )
};
export default MyDataGrid;


