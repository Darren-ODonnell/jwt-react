import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import * as FileSaver from 'file-saver'
import * as XLSX from "xlsx";




const Export = ( { exportType, setExportType, gridApi } ) => {
   // const renderCount = useRef( 0 );
   // useEffect(() => {
   //    renderCount.current++;
   //    console.log('Render count - Export:', renderCount.current);
   // });
   const theme = useTheme()
   const handleExport = async (exportType) => {
      const columnApi = gridApi.gridOptionsService.columnApi
      if (gridApi && columnApi) {
         // Get an array of all displayed columns in the grid
         const displayedColumns = columnApi.getAllDisplayedColumns();

         // Filter out the Actions column
         const columnsToExclude = ['Actions'];
         const columnsToInclude = displayedColumns.filter((column) => !columnsToExclude.includes(column.getColDef().headerName));

         exportType === 'CSV'
            ? await exportCSV( columnsToInclude, gridApi )
            : await exportExcel( columnsToInclude, gridApi )
      }
   }
   const exportCSV = async ( columnsToInclude, gridApi ) => {

      // params for csv conversion
      const params = {
         suppressQuotes: true,
         columnSeparator: ',',
         columnKeys: columnsToInclude.map( ( column ) => column.getColId() ),
         processCellCallback: ( params ) => {
            return params.value;
         },
      };

      const csvData = gridApi.getDataAsCsv( params );
      const csvFile = new Blob( [ csvData ], { type: "text/csv;charset=utf-8" } );

      // get filename from user
      const options = { types: [ { description: 'CSV File', accept: { 'text/plain': [ '.csv' ] }, } ], }
      const fileHandle = await window.showSaveFilePicker( options );

      // save to csv
      FileSaver.saveAs( csvFile, fileHandle.name );
   }

   const exportExcel = async ( columnsToInclude, gridApi ) => {

      // params for
      const params = {
         suppressQuotes: true,
         columnSeparator: ',',
         columnKeys: columnsToInclude.map( ( column ) => column.getColId() ),
         processCellCallback: ( params ) => {
            return params.value;
         },
      };
      // convert to csv first
      const csvData = gridApi.getDataAsCsv( params );


      // get filename from user
      const options = {
         types: [
            { description: 'Excel Workbook', accept: { 'text/plain': [ '.xlsx' ] }, },
            { description: 'XML Data', accept: { 'text/plain': [ '.xml' ] }, }, ],
      };
      const fileHandle = await window.showSaveFilePicker( options );

      // now convert and save to excel
      downloadExcelFromCSV( csvData, fileHandle.name )

   }

   const ExportDropDown = () => {
      // console.log( "Export Page - dropdown" )
      return (
         <>
            <FormControl variant="outlined" color="primary">
               <Select value={ exportType } defaultValue={ exportType }
                       onChange={ ( event ) => setExportType( event.target.value ) }
                       sx={{
                          background: theme.palette.primary.main,
                          color: '#fff',
                          height: 40,
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          '&:hover': {
                             backgroundColor: 'green',
                          },
                       } }


               >
                  <MenuItem value="CSV">CSV</MenuItem>
                  <MenuItem value="Excel">Excel</MenuItem>
               </Select>
            </FormControl>

         </>
      )
   }
   const ExportActionButton = () => {
      // console.log( "Export Page - action" )
      return (
         <>
            <Button className="export-button"
                    onClick={ () => handleExport( exportType ) }
            >Export { exportType }
            </Button>
         </>
      )
   }
   return (
      <div style={ { marginBottom: '10px' } }>
         <ExportDropDown/>
         <ExportActionButton/>
      </div>
   );
}

function downloadExcelFromCSV( csv, filename ) {
   // the community version of aggrid does not have an ExportDataAsExcel function - this is reserved for the Enterprise version
   // Convert CSV string to an array of arrays
   const data = csv.split( '\n' ).map( row => row.split( ',' ) );

   // Create a new workbook and add a new sheet and add the data
   const workbook = XLSX.utils.book_new();
   const worksheet = XLSX.utils.aoa_to_sheet( data );
   XLSX.utils.book_append_sheet( workbook, worksheet, 'Sheet1' );

   // Export the workbook to XLSX format and trigger the download
   XLSX.writeFile( workbook, filename );
}


export default Export;

