import React, { useEffect, useState, useRef, Fragment, useCallback, useMemo } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Dialog, DialogContent, FormControl, Grid, MenuItem, Select } from "@mui/material";
import { defaultColDef, refreshPage } from "../common/helper";
import { deleteData, getData, useAxios, useAxios2 } from "../api/ApiService";
import {Position} from '../entities/positions'
import {Pitchgrid} from '../entities/pitchgrids'
import {GRID_ROW_DELETE, REPORT_PRINT_PREVIEW} from "../common/globals";
import {loadDataForTeamsheet, Teamsheet} from "../entities/teamsheets";
import TeamsheetReport from "../teamsheetComponents/TeamsheetReport";
import FormDialog from "./FormDialog";
import ConfirmationModal from "../common/ConfirmationModal";
import ReportModal from "../teamsheetComponents/ReportModal";
import {useTheme} from '@mui/material/styles';
import ImportExport from "../common/ImportExport";
import TeamsheetDnd from "../teamsheetComponents/TeamsheetDnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {PLAYER_URLS, playerData} from "../entities/players";
import'../App.css'

import DropDownData, {
    GetTeamsheetByFixtureId,
    LastTeamsheet, LoadData,
    Players,
    Teamsheets, usePlayers,
    useTeamsheets
} from "../common/DropDownData";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import {v4} from 'uuid'

let myTeam = [
    {key: 1, id: 1, name: "John Doe", position: 1},
    {key: 2, id: 2, name: "Jane Doe", position: 2},
    {key: 3, id: 3, name: "Bob Smith", position: 3},
    {key: 4, id: 4, name: "Sara Johnson", position: 4},
    {key: 5, id: 5, name: "Tom Jackson", position: 5},
    {key: 6, id: 6, name: "Emily Davis", position: 6},
    {key: 7, id: 7, name: "Chris Lee", position: 7},
    {key: 8, id: 8, name: "Linda Brown", position: 8},
    {key: 9, id: 9, name: "Adam Garcia", position: 9},
    {key: 10, id: v4(), name: "", position: 10},
    {key: 11, id: v4(), name: "", position: 11},
    {key: 12, id: v4(), name: "", position: 12},
    {key: 13, id: v4(), name: "", position: 13},
    {key: 14, id: v4(), name: "", position: 14},
    {key: 15, id: 15, name: "Frank Robinson", position: 15},

    // { key:  10, id: 10, name: "Amy Patel"       , position: 10},
    // { key:  11, id: 11, name: "Benjamin Wright" , position: 11},
    // { key:  12, id: 12, name: "Catherine Martin", position: 12},
    // { key:  13, id: 13, name: "David Wilson"    , position: 13},
    // { key:  14, id: 14, name: "Elizabeth Turner", position: 14},
    // { key:  15, id: 15, name: "Frank Robinson"  , position: 15},
];
let myPanel = [
    {key: 16, id: 16, name: "Grace Walker", position: 0},
    {key: 17, id: 17, name: "Henry Kim", position: 0},
    {key: 18, id: 18, name: "Isabella Chen", position: 0},
    {key: 19, id: 19, name: "Jacob Stewart", position: 0},
    // { key: 20, id: 20, name: "Katie Huang"    , position: 0},
    // { key: 21, id: 21, name: "Liam Ramirez"   , position: 0},
    // { key: 22, id: 22, name: "Mia Nguyen"     , position: 0},
    // { key: 23, id: 23, name: "Noah Phillips"  , position: 0},
    // { key: 24, id: 24, name: "Olivia Smith"   , position: 0},
    // { key: 25, id: 25, name: "Paula Davis"    , position: 0},
    // { key: 26, id: 26, name: "Quinn Green"    , position: 0},
    // { key: 27, id: 27, name: "Ryan Hernandez" , position: 0},
    // { key: 28, id: 28, name: "Sophia Lee"     , position: 0},
    // { key: 29, id: 29, name: "Tyler Rodriguez", position: 0},
    // { key: 30, id: 30, name: "Violet Patel"   , position: 0},
    // { key: 31, id: 31, name: "William Brown"  , position: 0},
    // { key: 32, id: 32, name: "Xavier Kim"     , position: 0},
    // { key: 33, id: 33, name: "Yara Gomez"     , position: 0},
    // { key: 34, id: 34, name: "Zoe Martinez"   , position: 0},
    // { key: 35, id: 35, name: "Alex Turner"    , position: 0},
    // { key: 36, id: 36, name: "Bella Davis"    , position: 0},
    // { key: 44, id: 44, name: "Jasmine Nguyen" , position: 0},
    // { key: 45, id: 45, name: "Kian Ramirez"   , position: 0},
    // { key: 46, id: 46, name: "Luna Smith"     , position: 0},
    // { key: 47, id: 47, name: "Max Green"      , position: 0},

]
let mySubs = [
    {key: 37, id: 37, name: "Charlie Lee", position: 0},
    {key: 38, id: 38, name: "Dylan Johnson", position: 0},
    {key: 39, id: 39, name: "Ella Hernandez", position: 0},
    {key: 40, id: 40, name: "Finn Robinson", position: 0},
    {key: 41, id: 41, name: "Georgia Wright", position: 0},
    // { key: 42, id: 42, name: "Hannah Chen"   , position: 0},
    // { key: 43, id: 43, name: "Ian Wilson"    , position: 0},
]

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
    // enable/disable team,sheet dnd display - false by default
    const [teamsheetDnd, setTeamsheetDnd] = useState(false)
    const [panel, setPanel] = useState()
    const [team, setTeam] = useState()
    const [subs, setSubs] = useState()
    const [teamsheets, players, lastTeamsheet] = LoadData();
    // const players = usePlayers()
    // const teamsheets = useTeamsheets()
    // const lastTeamsheet = LastTeamsheet()


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
    // teamsheet DnD handling
    const handleTeamsheetSave = () => {
        console.log("Team-sheet Save in App")
        setTeamsheetDnd(false)
    }
    const handleTeamsheetCancel = () => {
        console.log("Team-sheet Cancel in App")
        setTeamsheetDnd(false)
    }
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
    const handleEdit = useCallback((params) => {
        if(props.type==="Teamsheet") {
            prepareTeamsheetDnd("Edit", params.data.id.fixtureId)
        } else {
            getSelectedRow();
            handleOpen();
        }
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
    const handleShowDeleteModal = () => {
        if ( props.type === "Teamsheet" ) {
            setShowDeleteModal( false )
        } else {
            setShowDeleteModal( true )
        }
    }
    const prepareTeamsheetDnd = (action,id) => {
        // create team subs and updated panel

        const newTeam = (action === "Add")
            ? lastTeamsheet
            : teamsheets.filter(t => t.id.fixtureId === id)

        let newSubs = newTeam.filter(s => s.position.id > 15)

        console.log("LastTeamsheet: " + JSON.stringify(lastTeamsheet))

        setPanel(players)
        setTeam(newTeam)
        setSubs(newSubs)
        setTeamsheetDnd(true)
    }

    // useEffect(() => {
    // console.log("Team: " + JSON.stringify(team))
    // }, [team])


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
        // check if teamsheet
        // if teamsheet
        // check if rows === 0 or > 30 - then set filter.
        // get players
        //
        if(params.type==="Teamsheet") {
            prepareTeamsheetDnd("Add")

        } else {
            setSelectedRow( { ...props.initialValue } )
            handleOpen( params )
        }

    }
    // // when to show buttons
    const showAddButton          = (type) => { return !(type === Position || type === Pitchgrid)   }
    const showDeleteButton       = (type) => { return !(type === Position || type === Pitchgrid)   }
    const showPrintPreviewButton = (type) => { return  (type === Teamsheet) }
    //
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
    //
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

    useEffect(() => {
        setRowData(data);
    }, [data]);
    useEffect(() => {
        getData(props.methods.list, axiosApi, handleClose)
        // setPanel(Players())
        // setTeam(LastTeamsheet())
        // setDropDownData(DropDownData())
    }, []);
    // useEffect(() => {
    //     if(props.type==="Teamsheet") {
    //         prepareTeamsheetDnd("Delete")
    //     } else {
    //         if ( deleteNode ) {
    //             console.log( "DeleteNode:" + selectedRow )
    //             // deleteData(selectedRow);
    //             setDeleteNode( false );
    //         }
    //     }
    // }, [deleteNode, selectedRow, deleteConfirmation]);

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
        handleClose : handleClose,
        onClose     : handleClose,
        // onSubmit: handleSubmit,
        open        : open,
        setOpen     : handleOpen,         // dummy value to test index .. props.index previous
        // data: selectedRow,
        rowData     : {...selectedRow},
        // values:selectedRow,
        // onChange: onChange,
        methods     : props.methods,
        setRowData  : setRowData,
        colDefs     : props.columnDefs,
        messages    : props.messages,
        initialValue: props.initialValue,
        axiosApi    : axiosApi,
        entity      : props.type,
        loading     : loading,
        error       : error,
        validate    : validate,
    }
    const handleDeleteConfirmation = () => {
        if (props.type === "Teamsheet") {
            console.log("Teamsheet Delete")
            setDeleteConfirmation(false)
        } else {
            setDeleteConfirmation(true)
        }
    }

    const dialogPaperStyle = {
        maxWidth: '1600px',
    };

    // if (teamsheetDnd)
    // console.log("MyDataGrid-Team: " + JSON.stringify(team))

    return (
        !loading ? <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input">
            {/* Use fragment to Keep buttons on same line above grid */}
            <Fragment>
                {showPrintPreview ? <TeamsheetReport props={filteredData}/> : null}
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <PrintPreviewButton {...props} gridApi={gridApi}/>
                    {exportType && setExportType &&
                        <ImportExport exportType={exportType} setExportType={setExportType}/>}
                    <AddButton {...props}/>
                </div>
            </Fragment>

            {/* Show Grid - always shown*/}
            <AgGridReact  {...commonParams} {...gridParams} style={{zIndex:1}} />

            {/* Show pagination button below grid */}
            <PaginationButton/>

            {/* show Import/Export Buttons here... */}
            {/*<button onClick={exportData}>Export Data</button>*/}

            {/* Popup form triggerd by open */}
            <FormDialog   {...formParams}  />
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
                type="Filter"
            />
            {/* Show print preview of Teamsheet */}
            <ReportModal open={modalOpen} onClose={handleCloseModal} data={reportData}/>

            {/* Delete Record if confirmation good */}
            {deleteConfirmation && deleteData(selectedRow, error, props, axiosApi, handleClose) && setDeleteConfirmation(false)}
            {/* Bring up Teamsheet Drag n Drop */}


            {(
                <Dialog open={teamsheetDnd} onClose={handleTeamsheetCancel} maxWidth="lg" fullWidth>
                    <DialogContent style={dialogContentStyle}>
                        <DndProvider backend={HTML5Backend}>
                            <TeamsheetDnd
                                myTeam={team}
                                myPanel={panel}
                                mySubs={subs}
                                handleSave={handleTeamsheetSave}
                                handleCancel={handleTeamsheetCancel}
                                methods={props.methods}
                                teamsheetDnd={teamsheetDnd}/>
                        </DndProvider>
                    </DialogContent>
                </Dialog>
            )}
        </div> : <p> Loading...</p>
    )
};
export default MyDataGrid;

const dialogContentStyle = {
    width: 'auto',
    height: '820px',
    overflow: 'hidden',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
};
