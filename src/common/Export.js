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
            // suppressQuotes: true,
            fileName: 'data.xlsx',
            sheetName: 'Sheet1',
            columnKeys: columnsToInclude.map( ( column ) => column.getColId() ),
                    };

        gridApi.exportDataAsExcel( params );

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
        <div style={{ marginBottom: '10px' }}>
            <ExportDropDown/>
            <ExportActionButton/>
        </div>
    );
}

export default Export;

