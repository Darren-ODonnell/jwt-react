import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { TeamsheetContext } from '../context/TeamsheetContext';
import { AgGridReact } from 'ag-grid-react';
import { Button, Dialog, DialogContent, Grid } from "@mui/material";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import { defaultColDef, handleClickAway } from "../common/helper";
import { deleteData, getData, useAxios } from "../api/ApiService";
import { Position } from '../entities/positions'
import { Pitchgrid } from '../entities/pitchgrids'
import { GRID_ROW_DELETE, REPORT_PRINT_PREVIEW } from "../common/globals";
import { loadDataForTeamsheet, Teamsheet, TEAMSHEET_URLS } from "../entities/teamsheets";
import TeamsheetReport from "../teamsheetComponents/TeamsheetReport";
import FormDialog from "./FormDialog";
import ConfirmationModal from "../common/ConfirmationModal";
import ReportModal from "../teamsheetComponents/ReportModal";
import Export from "../common/Export";
import TeamsheetDnd from "../teamsheetComponents/TeamsheetDnd";
import { LoadData, useTeamsheets } from "../common/DropDownData";
import '../App.css'
import FixtureSelect from "../common/FixtureSelect";


const MyDataGrid = ( { props } ) => {
   const [ gridApi, setGridApi ] = useState( null );
   const gridRef = useRef( null );
   const [ paginationEnabled, setPaginationEnabled ] = useState( true );
   // used with delete to confirm the record is to be deleted
   const [ deleteNode, setDeleteNode ] = useState( false )
   // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const [ showPrintPreview, setShowPrintPreview ] = useState( false );
   // data for form
   const [ selectedRow, setSelectedRow ] = useState()
   // grid data
   const [ rowData, setRowData ] = useState( [] );
   // form control
   const [ open, setOpen ] = useState( false );
   // api control
   const [ data, error, loading, axiosApi ] = useAxios();
   // print preview handler state
   const [ filteredData, setFilteredData ] = useState( [] )
   // show Delete Confirmation state
   const [ showDeleteModal, setShowDeleteModal ] = useState( false );
   // used with Filter Confirmation modal
   const [ showFilterModal, setShowFilterModal ] = useState( false );
   // used with delete confirmation modal
   const [ deleteConfirmation, setDeleteConfirmation ] = useState( false )
   // handling the teamsheet data to bew printed
   const [ reportData, setReportData ] = useState( {} )
   // open/close reportModal for printing
   const [ modalOpen, setModalOpen ] = useState( false );
   const [ exportType, setExportType ] = useState( 'CSV' );
   // enable/disable team,sheet dnd display - false by default
   const [ teamsheetDnd, setTeamsheetDnd ] = useState( false )
   const { team, setTeam, panel, setPanel, subs, setSubs } = useContext( TeamsheetContext );
   const [ fixture, setFixture ] = useState( {} )
   // const theme = useTheme();
   const [ previousTeamsheets, setPreviousTeamsheets ] = useState( [] )
   const [ teamsheetPrepared, setTeamsheetPrepared ] = useState( false )
   const [ fixtureSelected, setFixtureSelected] = useState(false)
   const [ players, teamsheets, lastTeamsheets, positions, fixtures, fixturesWithNoTeamsheets ] = LoadData();
   const renderCount = useRef( 0 );

   let message = "";

   const handleOpen = useCallback( () => {
      setOpen(true);
   }, []);
   const handleClose = useCallback(() => {
      setOpen(false);
   }, []);
   const onRowSelected = useCallback((event) => {
      setSelectedRow(event.node.data);
   }, []);

   // teamsheet DnD handling
   // const handleTeamsheetSave = (data) => {
   //    setTeamsheetDnd( false )
   // }
   const handleTeamsheetCancel = () => {
      setTeamsheetDnd(false)
   }
   const onChange = useCallback((e) => {
      const {value, id} = e.target;
      setRowData({...rowData, [id]: value});
   }, [rowData]);

   const onGridReady = useCallback((params) => {
      setGridApi( params.api );
      const gridApi = params.api;
      gridApi.addEventListener( 'rowSelected', function( event ) {
         let selectedRows = gridApi.getSelectedRows();
         setSelectedRow( selectedRows[ 0 ] );
      } );
   }, [] );
   // returned the filtered data
   const handleFilterChanged = useCallback( () => {
      // capture the data when a filter is set on the grid
      // model = gridApi
      const model = gridApi.getModel().rowsToDisplay
      let newFilteredData = model.map( function( m ) {
         return m.data
      } )
      setFilteredData( newFilteredData )
   }, [ gridApi ] );

   const getSelectedRow = useCallback( () => {
      if ( gridApi ) {
         const selectedNodes = gridApi.getSelectedRows();
         if ( selectedNodes.length === 1 ) {
            setSelectedRow( selectedNodes[ 0 ] );
         }
      }
   }, [ gridApi ] );
   const formActions = {
      headerName: 'Actions',
      field: 'id',
      width: 200,
      editable: false,
      pinned: 'right',
      filter: false,
      sortable: false,
      lockPosition: 'right',
      cellRenderer: ( params ) => {
         return (
            <>
               <EditButton { ...params } />
               <DeleteButton { ...params }/>
            </>
         )
      }
   };
   const handleCloseModal = () => {
      setModalOpen( false );
   };
   // Add button in grid
   const EditButton = ( params ) => {
      return (
         <Button onClick={ () => handleEdit( params ) }
                 variant="outlined"
                 color="primary"
         > Edit </Button>
      )
   }
   const handleEdit = useCallback( ( params ) => {
      if ( teamsheets ) {
         if ( props.type === Teamsheet ) {
            prepareTeamsheetDnd( "Edit", params.data.id.fixtureId )
         } else {
            getSelectedRow();
            handleOpen();
         }
      }
   }, [ teamsheets ] );
   // Delete Button in Grid
   const DeleteButton = ( params ) => {
      message = GRID_ROW_DELETE;
      return (
         // positions and pitchgrids are reference data and dont need add/delete operations
         showDeleteButton( props.type ) ?
            <Button onClick={ handleShowDeleteModal }
                    variant="outlined"
                    color="secondary"
            > Delete </Button>
            :
            <Button disabled={ true }
                    variant="outlined"
                    color="secondary"
            >NO Delete </Button>
      )
   }
   const handleShowDeleteModal = () => {
      setShowDeleteModal( props.type === Teamsheet ? false : true )
   }
   const prepareTeamsheetDnd = ( action, id, props ) => {
      // create team subs and updated panel
      let newTeam = []
      if ( !teamsheetPrepared ) {

         if ( props.updatedTeamsheets ) {
            switch (action) {
               case "Add":
                  props.updatedTeamsheets.forEach(ut => {
                     ut.id.playerId = -1
                     newTeam.push(ut)
                  })
                  break
               default:
                  newTeam = props.updatedTeamsheets.filter( t => t.fixture.id === id )
                     .sort( ( a, b ) => a.position.id - b.position.id )
            }

            let fixtureId = ( id )
               ? id
               : getFixtureId( newTeam )

            // Panel = Players - Team
            const playersNotOnTeamSorted = players.filter( player => !newTeam.some( teamPlayer => teamPlayer.player.id === player.id ) )
               .sort( ( a, b ) => a.lastname.localeCompare( b.lastname ) )

            // subs are numbered 16 and higher
            const newSubs = newTeam.filter( s => s.position.id > 15 )
            const filteredTeam = newTeam.filter( s => s.position.id <= 15 )
            const fillInBlanksTeam = fillEmptyPositions( filteredTeam, fixtureId )

            setPanel( playersNotOnTeamSorted )
            setTeam( fillInBlanksTeam.sort((a,b) => a.position.id - b.position.id) )
            setSubs( newSubs.sort((a,b) => a.position.id - b.position.id) )
            setTeamsheetDnd( true )
            setTeamsheetPrepared( true )
         } else {
            console.log( "PrepareTeamsheet-Teamsheets: Empty ", teamsheets )
         }
      }
   }
   const getFixtureId = ( team ) => {
      const posn = team.find( item => {
         return typeof item === "object" && item !== null && Object.keys( item ).length > 0
      } )
      return posn.id.fixtureId
   }

   function fillEmptyPositions( team, id ) {
      const teamsheetId = {
         fixtureId: id,
         playerId: -1,
      }
      const filler = {
         id: teamsheetId,
         fixture: fixtures.find( f => f.id === id ),
         player: { id: -1, firstname: "", lastname: "" },
         position: {abbrev: "", id: -1, name: ""},
         jerseyNumber : 0,
      }
      for ( let i = 0; i < 15; i++ ) {
         if ( !team[ i ] ) {
            filler.position = positions[ i + 1 ]
            filler.jerseyNumber = filler.position.id
            team[ i ] = filler
         }
      }
      return team
   }

   // Add Button
   const AddButton = ( params, messages ) => {
      switch ( params.type ) {
         case Pitchgrid:
         case Position:
            return (
               <Grid align="right">
                  <Button disabled={ true } onClick={ () => handleOpen( params ) }
                          variant="contained"
                          color="primary"
                  >NO ADDITION</Button>
               </Grid>
            )
         case Teamsheet:
            return lastTeamsheets && (
               <FixtureSelect
                  { ...params }
                  messages              = { props.messages }
                  fixtures              = { fixturesWithNoTeamsheets }
                  handleAdd             = { handleAdd }
                  params                = { params }
                  fixture               = { fixture }
                  setFixture            = { setFixture }
                  setFixtureSelected    = { setFixtureSelected}
                  lastTeamsheets        = { lastTeamsheets }
                  setPreviousTeamsheets = { setPreviousTeamsheets }
                  handleEdit            = { handleEdit }
                  setTeamsheetPrepared  = { setTeamsheetPrepared }
               />
            )
         default:
            return (
               <Grid align="right">
                  <Button onClick={ () => handleAdd( params ) }
                          variant="contained"
                          color="primary"
                          style={{ height: '40px' }}
                  >{ props.messages.add }</Button>
               </Grid>
            )
      }
   };
   const handleAdd = ( params ) => {
      if ( params.type === Teamsheet ) {
         prepareTeamsheetDnd( "Add" , params)
      } else {
         setSelectedRow( { ...props.initialValue } )
         handleOpen( params )
      }
   }
   // // when to show buttons
   const showDeleteButton = ( type ) => {
      return !( type === Position || type === Pitchgrid )
   }
   const showPrintPreviewButton = ( type ) => {
      return ( type === Teamsheet )
   }
   //
   // print preview
   const PrintPreviewButton = ( params ) => {
      message = REPORT_PRINT_PREVIEW
      return (
         showPrintPreviewButton( props.type ) && (
            <Grid align="left">
               <Button className="grid-button" onClick={ ( params ) => handlePrintModal( params, filteredData ) }
                       variant="contained"
                       color="primary"
                       sx={{
                          fontSize: '16px',
                       }}

               >PrintPreview</Button>
               };
            </Grid>
         )
      )
   }
   const handlePrintModal = () => { // display the report modal if a filter has been applied
      if ( filteredData === [] || filteredData.length === 0 ) {

         message = "Filter Teamsheet to a specific Fixture Date using Grid"
         setShowFilterModal( true )
         setModalOpen( false );
      } else {
         if ( filteredData.length <= 30 ) {

            setShowFilterModal( false )
            setReportData( loadDataForTeamsheet( filteredData.sort((a,b) => a.positionNumber - b.positionNumber) ) )
            setModalOpen( true );
         } else {
            setShowFilterModal( true )
            setModalOpen( false );
         }
      }
   };

   // Pagination
   const togglePagination = () => {
      const pageSize = paginationEnabled ? 1000 : 10;
      setPaginationEnabled( !paginationEnabled );
      gridApi.paginationSetPageSize(pageSize);
   };
   const PaginationButton = () => {
      return (
         <Button onClick={togglePagination}
         sx={{
            height: '40px',
            fontSize: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

         }}

         >
            {paginationEnabled ? 'Disable Pagination' : 'Enable Pagination'}
         </Button>
      )
   }

   // useEffect( () => {
   //    renderCount.current++;
   //    console.log( 'Render count - MyDataGrid:', renderCount.current );
   // } );
   useEffect(() => {
      setRowData(data);
   }, [data]);
   useEffect(() => {
      getData(props.methods.list, axiosApi, handleClose)
   }, []);

   // dummy method for now - this needs to be setup in each entity file
   const validate = (values) => {
      return true
   }


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
      columnDefs: [ ...props.columnDefs, formActions ],
      rowSelection: "multiple",
   }


   const formParams = {
      handleClose: handleClose,
      onClose: handleClose,
      open: open,
      setOpen: handleOpen,         // dummy value to test index .. props.index previous
      rowData: {...selectedRow},
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
   }
   const handleDeleteConfirmation = () => {
      if ( props.type === Teamsheet ) {

         setDeleteConfirmation( false )
      } else {
         setDeleteConfirmation( true )
      }
   }
   const handleFilterConfirmation = () => {
      if ( props.type === Teamsheet ) {

         setDeleteConfirmation( false )
      } else {
         setDeleteConfirmation( true )
      }
   }

   return (
      !loading ? <div className="ag-theme-alpine-dark datagrid ag-input-field-input ag-text-field-input">
         {/* Use fragment to Keep buttons on same line above grid */ }
         <Fragment>
            {/*{ showPrintPreview ? <TeamsheetReport props={ filteredData }/> : null }*/}
            <div style={ { display: "flex", justifyContent: "space-between" } }>
               <PrintPreviewButton { ...props } gridApi={ gridApi }/>
               { exportType && setExportType &&
                  <Export exportType={ exportType } setExportType={ setExportType } gridApi={ gridApi }/> }
               <AddButton { ...props }  />
            </div>
         </Fragment>

         {/* Show Grid - always shown*/ }
         <AgGridReact  { ...gridParams }  />

         {/* Show pagination button below grid */ }
         <PaginationButton/>

         {/* show Export Buttons here... */ }
         {/*<button onClick={exportData}>Export Data</button>*/ }

         {/* Popup form triggered by open */ }
         <FormDialog   { ...formParams }  />
         {/* show delete modal when required by set/reset showModal */ }
         <ConfirmationModal
            showModal={ showDeleteModal }
            setShowModal={ setShowDeleteModal }
            setConfirmation={ handleDeleteConfirmation }
            title="Delete Item"
            message="Are you sure you want to delete this item?"
            type="Delete"
         />
         {/* Printing Teamsheet*/ }
         {/* Filter Popup Modal - pops up if too many records selected in grid for team-sheet*/ }
         <ConfirmationModal
            showModal={ showFilterModal }
            setShowModal={ setShowFilterModal }
            setConfirmation={ handleFilterConfirmation }
            title="Filter By Fixture Date"
            message="Use Fixture Date Filter to select the teamsheet for a single fixture"
            type="Filter"
         />
         {/* Show print preview of Teamsheet */ }
         <ReportModal open={ modalOpen } onClose={ handleCloseModal } data={ reportData }/>

         {/* Delete Record if confirmation good */ }
         { deleteConfirmation && deleteData( selectedRow, error, props, axiosApi, handleClose ) && setDeleteConfirmation( false ) }

         {/* Bring up Teamsheet Drag n Drop */ }
         { (
            <Dialog open={ teamsheetDnd } maxWidth="lg" fullWidth onClose={ handleClickAway }>
               <DialogContent style={ dialogContentStyle }>
                  <TeamsheetDnd
                     // pass state to child component
                     // handleSave={ handleTeamsheetSave }
                     handleCancel         = {handleTeamsheetCancel}
                     setRowData           = {setRowData}
                     methods              = {props.methods}
                     teamsheetDnd         = {teamsheetDnd}
                     setFixtureSelected   = {setFixtureSelected}
                     setTeamsheetPrepared = {setTeamsheetPrepared}
                  />
               </DialogContent>
            </Dialog>
         ) }
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
