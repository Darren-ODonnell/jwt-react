import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import './Export.css'
import * as FileSaver from 'file-saver'
import * as XLSX from "xlsx";
import { ModuleRegistry } from 'ag-grid-community/core';
import { ExcelExportModule } from 'ag-grid-community/excel-export';

const Export = ({exportType, setExportType, gridApi }) => {

    const [exportFormat, setExportFormat] = useState(exportType)
    const theme = useTheme()

    const handleExport = ( exportType ) => {
        const columnApi = gridApi.gridOptionsService.columnApi


        if ( gridApi && columnApi ) {
            // Get an array of all displayed columns in the grid
            const displayedColumns = columnApi.getAllDisplayedColumns();

            // Filter out the Actions column
            const columnsToExclude = [ 'Actions' ];
            const columnsToInclude = displayedColumns.filter( ( column ) => !columnsToExclude.includes( column.getColDef().headerName ) );

            exportType === 'CSV'
                ? exportCSV( columnsToInclude, gridApi)
                : exportExcel( columnsToInclude, gridApi)
        }
    }
    const exportCSV = ( columnsToInclude, gridApi ) => {

        const params = {
            suppressQuotes: true,
            fileName: 'data.csv',
            columnSeparator: ',',
            columnKeys: columnsToInclude.map( ( column ) => column.getColId() ),
            processCellCallback: (params) => {
                return params.value;
            },
        };

        const csvData = gridApi.getDataAsCsv( params );
        const blob = new Blob( [ csvData ], { type: "text/csv;charset=utf-8" } );
        FileSaver.saveAs( blob, params.filename );

    }

    const exportExcel =  (columnsToInclude, gridApi) => {

        const params = {
            suppressQuotes: true,
            fileName: 'data.csv',
            columnSeparator: ',',
            columnKeys: columnsToInclude.map((column) => column.getColId()),
            processCellCallback: (params) => {
                return params.value;
            },
        };
        const csvData = gridApi.getDataAsCsv(params);
        downloadExcelFromCSV(csvData,)

    }



    const ExportDropDown = () => {
        // console.log("Export Page - dropdown")
        return (
            <>
                <FormControl variant="outlined" color="primary">
                    <Select  value={ exportType } defaultValue={exportType}
                            onChange={ ( event ) => setExportType(event.target.value) }
                            sx={{
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                height: 38
                            }}
                    >
                        <MenuItem value="CSV">CSV</MenuItem>
                        <MenuItem value="Excel">Excel</MenuItem>
                    </Select>
                </FormControl>

            </>
        )
    }
    const ExportActionButton = () => {
        // console.log("Export Page - action")
        return (
            <>
                <Button className="export-button"
                        onClick={() => handleExport(exportType)}

                >Export { exportType }
                </Button>
            </>
        )
    }
    return (
        <div style={{marginBottom: '10px'}}>
            <ExportDropDown/>
            <ExportActionButton/>
        </div>
    );
}

function downloadExcelFromCSV(csv, filename) {
    // Convert CSV string to an array of arrays
    const data = csv.split('\n').map(row => row.split(','));

    // Create a new workbook and add a new sheet with the data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Export the workbook to XLSX format and trigger the download
    XLSX.writeFile(workbook, filename);
}


export default Export;

