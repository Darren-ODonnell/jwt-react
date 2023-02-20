import React, { useEffect, useState, useRef, useMemo, Fragment } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {Button, Grid} from "@mui/material";
import './MyDataGrid.css'
import FormDialog from "./FormDialog";
import {defaultColDef, getUniqueId, refreshPage} from "../common/helper";
import {useAxios, useAxios2} from "../api/ApiService";
import instance from "../api/axios";
import AuthService from "../auth/AuthService";
import {Position} from '../entities/positions'
import {Pitchgrid} from '../entities/pitchgrids'

import { GRID_ROW_DELETE, METHODS, REPORT_PRINT_PREVIEW } from "../common/globals";
import {COMPETITION_URLS} from "../entities/competitions";
import {PLAYER_URLS} from "../entities/players";
import {CLUB_URLS} from "../entities/clubs";
import {PITCH_GRID_URLS} from "../entities/pitchgrids";
import {STAT_NAME_URLS} from "../entities/statnames";
import {POSITION_URLS} from "../entities/positions";
import {Teamsheet} from "../entities/teamsheets";
// import HandlePrintPreview from "../teamsheetComponents/HandlePrintPreview"
import usePrintPreview from '../teamsheetComponents/usePrintPreview'

import TeamsheetReport from "../teamsheetComponents/TeamsheetReport";
import useConfirm from "../common/useConfirm";
import HandlePrintPreview from "../teamsheetComponents/HandlePrintPreview";
import FormDialog2 from "./FormDialog2";
import dropDownData from "../formcomponents/DropDownData";

const MyDataGrid = ({props}) => {
    // const [gridOptions, setGridOptions] = useState<GridOptions>({});
    const [gridApi, setGridApi] = useState(null);
    const gridRef = useRef(null);
    const [paginationEnabled, setPaginationEnabled] = useState(true);
    // manage id for edis and deletes
    const [id, setId] = useState(null)
    // used with delete to confirm the record is to be deleted

    const [showConfirm, setShowConfirm] = useState(false);
    const [showPrintPreview, setShowPrintPreview] = useState(false);
    // const {isPrintPreview, handlePrintPreview} = usePrintPreview(false);

    const [selectedRow, setSelectedRow] = useState(null)
    // grid data
    const [rowData, setRowData] = useState([]);
    // data for form
    const [formData, setFormData] = useState(props.initialValue)
    // form control
    const [open, setOpen] = useState(false);

    // api control
    const [data, error, loading, axiosApi] = useAxios();

    // print preview handler state
    const [filteredData, setFilteredData] = useState([])
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
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setFormData(props.initialValue);
    };

    const handleSelectionChanged = () => {
        if (gridApi != null) {
            const selectedRows = gridApi.getSelectedRows();
            setSelectedRow(selectedRows[0] || null);
            // Do something with selected rows...
        } else {
            console.log("Grid instance is null or undefined");
        }

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
        const selectedRows = gridApi.getSelectedRows();
        if (selectedRows.length > 0) {
            setSelectedRow(selectedRows[0])
            setFormData(selectedRows[0] || null);
            setOpen(true);
            console.log(selectedRows[0])
        }
    }

    // const handleConfirm = (id) => {
    //
    //     setOpen(false);
    //     const confirm = window.confirm("Are you sure, you want to delete this row", id)
    //     if (confirm) {
    //         deleteData(id)
    //     }
    // }

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

    const deleteData = ({data, error}) => {
        const user = AuthService.getCurrentUser();

        const selectedRows = gridApi.getSelectedRows();
        setFormData(selectedRows[0]);

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
            // setRowData(data)
            // console.log(data)
        }).catch(err => {
            setOpen(false)
        })        // cancel subscription to useEffect
        return () => (isSubscribed = false)
    }

    const [handleConfirm] = useConfirm(message, deleteData);

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
            showDeleteButton(props.type) ?
                <Button onClick={() => handleConfirm(params.data)}
                        variant="outlined"
                        color="secondary"
                > Delete </Button>
                :
                <div>
                    <Button disabled={true} onClick={() => handleConfirm(params.data)}
                            variant="outlined"
                            color="secondary"
                    >NO Delete </Button>
                </div>

        )
    }

    // above grid
    const AddButton = (params) => {
        return (
            showAddButton(params.type) ?
                <Grid align="right">
                    <Button onClick={() => handleOpen(params)}
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
        {
            message = REPORT_PRINT_PREVIEW
        }
        {
            console.log("PrintPreviewButton")
        }
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
    // watch when the filter is changed in the grid
    useEffect(() => {
        if (gridApi) {
            gridApi.addEventListener('filterChanged', handleFilterChanged);
        }
        return () => {
            if (gridApi) {
                gridApi.removeEventListener('filterChanged', handleFilterChanged);
            }
        };
    }, [gridApi]);
    // loading grid at start / and reloading on grid changes
    useEffect(() => {
        getData(props.methods.list)
    }, []);
    // what to do when row data changes

    useEffect(() => {
        if (gridApi) {
            const rows = gridApi.getSelectedRows()
            setSelectedRow(rows[0])
        }
    }, [gridApi, setSelectedRow]);

    useEffect(() => {
        setRowData(data);
    }, [data]);

    const handleSubmit = (formValues) => {
        if (selectedRow) {
            const index = rowData.findIndex((row) => row === selectedRow);
            const updatedRow = {...selectedRow, ...formValues};
            setRowData([...rowData.slice(0, index), updatedRow, ...rowData.slice(index + 1)]);
            setSelectedRow(null);
        } else {
            setRowData([...rowData, formValues]);
        }
        setOpen(false);
    };
    // handling delete
    useEffect(() => {
        if (showConfirm) {
            const confirmAction = window.confirm('Are you sure you want to delete this item?');
            if (confirmAction) {
                handleDelete(id);
            }
            setShowConfirm(false);
        }
    }, [showConfirm, id, handleDelete]);

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
        paginationPageSize: 10,
        columnDefs: [...props.columnDefs, formActions],
        onSelectionChanged: handleSelectionChanged,
        rowSelection: "single",
    }
    console.log("SelectedRow: " + selectedRow)
    console.log("open: " + open)
    console.log("onClose: " + handleClose)
    console.log("SelectedRow: " + selectedRow)

    const formParams = {
        index: props.index,        // check if key above can be used on its own...

        onClose: handleClose,
        onSubmit: handleSubmit,
        open: open,
        setOpen: setOpen,            // dummy value to test index .. props.index previous
        setFormData: setFormData,
        data: formData,
        formData: formData,
        rowData: selectedRow,
        onChange: onChange,
        // onClose: handleClose,
        methods: props.methods,
        colDefs: props.columnDefs,
        messages: props.messages,
        initialValue: props.initialValue,
        axiosApi: axiosApi,
        dropDownData: dropDownData,
    }
    const togglePagination = () => {
        const pageSize = paginationEnabled ? 0 : 10;
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

                <AgGridReact
                    {...commonParams}
                    {...gridParams}
                />
                <PaginationButton/>
                {/*<FormDialog*/}
                {/*    {...formParams}*/}

                {/*/>*/}

            </div>
            {/*<button onClick={exportData}>Export Data</button>*/}

        </div> : <p> Loading...</p>
    )
};

export default MyDataGrid;


// {...commonParams}
// {...formParams}
// open={open}
// rowData = {selectedRow}

