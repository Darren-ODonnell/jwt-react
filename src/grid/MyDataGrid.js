import React, {useEffect, useState, useRef, Fragment, useCallback, useMemo, useContext} from 'react';
import {TeamsheetContext} from '../context/TeamsheetContext';
import {AgGridReact} from 'ag-grid-react';
import {Button, Dialog, DialogContent, Grid} from "@mui/material";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import {defaultColDef, handleClickAway} from "../common/helper";
import {deleteData, getData, useAxios} from "../api/ApiService";
import {Position} from '../entities/positions'
import {Pitchgrid} from '../entities/pitchgrids'
import {GRID_ROW_DELETE, REPORT_PRINT_PREVIEW} from "../common/globals";
import {loadDataForTeamsheet, Teamsheet} from "../entities/teamsheets";
import TeamsheetReport from "../teamsheetComponents/TeamsheetReport";
import FormDialog from "./FormDialog";
import ConfirmationModal from "../common/ConfirmationModal";
import ReportModal from "../teamsheetComponents/ReportModal";
import Export from "../common/Export";
import TeamsheetDnd from "../teamsheetComponents/TeamsheetDnd";
import {LoadData} from "../common/DropDownData";
import '../App.css'
import FixtureSelect from "../common/FixtureSelect";
import { useTheme } from "@mui/material/styles";


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
    const {team, setTeam, panel, setPanel, subs, setSubs} = useContext(TeamsheetContext);
    const [fixture, setFixture] = useState({})
    // const theme = useTheme();
    const [lastTeamsheets, setLastTeamsheets] = useState([])

    const [teamsheets, players, lastTeamsheet, positions, fixtures, fixturesWithNoTeamsheets] = LoadData();

    const [teamsheetPrepared, setTeamsheetPrepared] = useState(false)

    const renderCount = useRef(0);
    useEffect(() => {
        renderCount.current++;
        console.log('Render count - MyDataGrid:', renderCount.current);
    });
    let message = "";

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);
    const onRowSelected = useCallback((event) => {
        setSelectedRow(event.node.data);
    }, []);
    // teamsheet DnD handling
    const handleTeamsheetSave = () => {
        // console.log("Team-sheet Save in App")
        setTeamsheetDnd(false)
    }
    const handleTeamsheetCancel = () => {
        // console.log("Team-sheet Cancel in App")
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
        const model = gridApi.getModel().rowsToDisplay;
        let newFilteredData = model.map(function (m) {
            return m.data
        })
        setFilteredData(newFilteredData)
        // console.log("FilteredData-: " + filteredData);
    }, [gridApi]);

    const getSelectedRow = useCallback(() => {
        if (gridApi) {
            const selectedNodes = gridApi.getSelectedRows();
            if (selectedNodes.length === 1) {
                setSelectedRow(selectedNodes[0]);
            }
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
        if (props.type === Teamsheet) {
            prepareTeamsheetDnd("Edit", params.data.id.fixtureId)
        } else {
            getSelectedRow();
            handleOpen();
        }
    }, []);
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
                <Button disabled={true}
                    variant="outlined"
                    color="secondary"
                >NO Delete </Button>
        )
    }
    const handleShowDeleteModal = () => {
        if (props.type === Teamsheet) {
            setShowDeleteModal(false)
        } else {
            setShowDeleteModal(true)
        }
    }
    const prepareTeamsheetDnd = (action,id) => {
        // create team subs and updated panel
        if (!teamsheetPrepared) {
            const newTeam = (action === "Add")
                ? lastTeamsheet
                : teamsheets.filter(t => t.id.fixtureId === id)
                    .sort((a, b) => a.position.id - b.position.id)

            let fixtureId = (id)
                ? id
                : getFixtureId(newTeam)

            // Panel = Players - Team
            const playersNotOnTeamSorted = players.filter(player => !newTeam.some(teamPlayer => teamPlayer.player.id === player.id))
                .sort((a, b) => a.lastname.localeCompare(b.lastname))

            // subs are numbered 16 and higher
            const newSubs = newTeam.filter(s => s.position.id > 15)
            const filteredTeam = newTeam.filter(s => s.position.id <= 15)
            const fillInBlanksTeam = fillEmptyPositions(filteredTeam, fixtureId)

            setPanel(playersNotOnTeamSorted)
            setTeam(fillInBlanksTeam)
            setSubs(newSubs)
            setTeamsheetDnd(true)
            setTeamsheetPrepared(true)
        }
    }
    const  getFixtureId = (team) => {
        const posn = team.find(item => {return typeof item === "object" && item !== null && Object.keys(item).length > 0})
        return posn.id.fixtureId
    }
    function fillEmptyPositions(team, id) {
        const filler = {
            fixture : fixtures.find(f => f.id === id),
            id: id,
            position:{},
            player: { id : -1, firstname: "", lastname : ""},
        }

        for (let i = 0; i < 15; i++) {
            if (!team[i]) {
                filler.position = positions[i + 1]
                team[i] = filler
            }
        }
        return team
    }

    // console.log("Team: " + JSON.stringify(team))

    // Add Button
    const AddButton = (params, messages) => {
        switch (params.type) {
            case Pitchgrid:
            case Position:
                return (
                    <Grid align="right">
                        <Button disabled={true} onClick={() => handleOpen(params)}
                                variant="contained"
                                color="primary"
                        >NO ADDITION</Button>
                    </Grid>
                )
            case Teamsheet:
                return lastTeamsheet && (
                    <FixtureSelect
                        messages={props.messages}
                        fixtures={fixturesWithNoTeamsheets}
                        handleAdd={handleAdd}
                        params={params}
                        fixture={fixture}
                        setFixture={setFixture}
                        lastTeamsheets={lastTeamsheet}
                        setLastTeamsheets={setLastTeamsheets}
                    />
                )
            default:
                return (
                    <Grid align="right">
                        <Button onClick={() => handleAdd(params)}
                                variant="contained"
                                color="primary"
                        >{props.messages.add}</Button>
                    </Grid>
                )
        }
    };
    const handleAdd = (params) => {
        if (params.type === Teamsheet) {
            prepareTeamsheetDnd("Add")
        } else {
            setSelectedRow({...props.initialValue})
            handleOpen(params)
        }
    }
    // // when to show buttons
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
        if (filteredData === [] || filteredData.length === 0) {
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

    useEffect(() => {
        setRowData(data);
    }, [data]);
    useEffect(() => {
        getData(props.methods.list, axiosApi, handleClose)
    }, []);

    // useEffect(() => {
    //     if (team.length > 0 && panel.length > 0 && subs.length > 0) {
    //         console.log("000-MyDataGrid: ", team[0].player, panel[0], subs[0].player)
    //     }
    // }, [team, panel, subs]);
    //
    // useEffect(() => {
    //     if(team && team.length)
    //         console.log("MyDataGrid-UseEffect - Team: " , team[0].player)    }, [team]);
    // useEffect(() => {
    //     if(panel && panel.length)
    //         console.log("MyDataGrid-UseEffect - Panel: ", panel[0])   }, [panel]);
    // useEffect(() => {
    //     if(subs && subs.length )
    //         console.log("MyDataGrid-UseEffect - subs: " , subs[0].player)    }, [subs]);

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
        rowSelection: "multiple",
    }
    const formParams = {

        handleClose : handleClose,
        onClose     : handleClose,

        open        : open,
        setOpen     : handleOpen,         // dummy value to test index .. props.index previous
        rowData     : {...selectedRow},
        methods     : props.methods,
        setRowData  : setRowData,
        colDefs     : props.columnDefs,
        messages    : props.messages,
        initialValue: props.initialValue,
        axiosApi    : axiosApi,
        entity      : props.type,
        loading     : loading,
        error       : error,

    }
    const handleDeleteConfirmation = () => {
        if (props.type === "Teamsheet") {
            console.log("Teamsheet Delete")
            setDeleteConfirmation(false)
        } else {
            setDeleteConfirmation(true)
        }
    }

    return (
        !loading ? <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input">
            {/* Use fragment to Keep buttons on same line above grid */}
            <Fragment>
                {showPrintPreview ? <TeamsheetReport props={filteredData}/> : null}
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <PrintPreviewButton {...props} gridApi={gridApi}/>
                    {exportType && setExportType &&
                        <Export exportType={exportType} setExportType={setExportType} gridApi={gridApi}/>}
                    <AddButton {...props}  />
                </div>
            </Fragment>

            {/* Show Grid - always shown*/}
            <AgGridReact  {...gridParams}  />

            {/* Show pagination button below grid */}
            <PaginationButton/>

            {/* show Export Buttons here... */}
            {/*<button onClick={exportData}>Export Data</button>*/}

            {/* Popup form triggered by open */}
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
                <Dialog open={teamsheetDnd} maxWidth="lg" fullWidth onClose={handleClickAway} >
                    <DialogContent style={dialogContentStyle}>
                        <TeamsheetDnd
                            // pass state to child component
                            team={team}
                            panel={panel}
                            subs={subs}
                            setTeam={setTeam}
                            setPanel={setPanel}
                            setSubs={setSubs}
                            handleSave={handleTeamsheetSave}
                            handleCancel={handleTeamsheetCancel}
                            methods={props.methods}
                            teamsheetDnd={teamsheetDnd}
                        />
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
