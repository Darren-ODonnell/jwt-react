import {AgGridReact} from 'ag-grid-react';
import {csvExportParams, CsvExportParams} from '@ag-grid-community/csv-export';
import {excelExportParams, ExcelExportParams} from '@ag-grid-community/excel-export';
import {useState} from "react";

function Export() {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const handleExportCsv = () => {
        if (gridApi && gridColumnApi) {
            const params = csvExportParams;
            gridApi.exportDataAsCsv(params);
        }
    };

    const handleExportExcel = () => {
        if (gridApi && gridColumnApi) {
            const params = excelExportParams;
            gridApi.exportDataAsExcel(params);
        }
    };

    return (
        <div>
            <div className="button-bar">
                <button onClick={handleExportCsv}>Export as CSV</button>
                <button onClick={handleExportExcel}>Export as Excel</button>
            </div>
            <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                />
            </div>
        </div>
    );
}
