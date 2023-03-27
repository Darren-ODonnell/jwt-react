import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import './ImportExport.css'

const ImportExport = ({exportType, setExportType }) => {
    const [exportFormat, setExportFormat] = useState(exportType)
    const theme = useTheme()

    const handleExport = ( exportType ) => {
        if ( exportType === 'CSV' ) {
            exportCSV();
        } else if ( exportType === 'Excel' ) {
            exportExcel();
        }
    }

    const exportCSV = ( gridApi ) => {
        if ( gridApi ) {
            const params = {
                suppressQuotes: true,
                fileName: 'data.csv',
                columnSeparator: ','
            };
            gridApi.getDataAsCsv( params );
        }
    }
    const exportExcel = ( gridApi ) => {
        if ( gridApi ) {
            const params = {
                fileName: 'data.xlsx',
                sheetName: 'Sheet1'
            };
            gridApi.getDataAsExcel( params );
        }
    }


    const ImportExportDropDown = () => {
        // console.log("ImportExport Page - dropdown")
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

    const ImportExportActionButton = () => {
        // console.log("ImportExport Page - action")
        return (
            <>
                <Button className="export-button"
                    onClick={ handleExport( exportType ) }

                >Export { exportType }
                </Button>
            </>
        )
    }

    return (
        <div style={{ marginBottom: '10px' }}>

            <ImportExportDropDown/>
            <ImportExportActionButton/>

        </div>

    )
}

export default ImportExport;

