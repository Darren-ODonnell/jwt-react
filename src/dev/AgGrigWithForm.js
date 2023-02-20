import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Grid, Button } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import FormDialog from './FormDialog';

const AgGridWithForm = () => {
    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState([
        { name: 'John Doe', age: 30, email: 'johndoe@example.com' },
        { name: 'Jane Smith', age: 25, email: 'janesmith@example.com' },
        { name: 'Bob Johnson', age: 45, email: 'bobjohnson@example.com' },
    ]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleGridReady = (params) => {
        setGridApi(params.api);
    };

    const handleAddRow = () => {
        setSelectedRow(null);
        setShowForm(true);
    };

    const handleEditRow = () => {
        if (selectedRow) {
            setShowForm(true);
        }
    };

    const handleDeleteRow = () => {
        if (selectedRow) {
            const index = rowData.findIndex((row) => row === selectedRow);
            setRowData(rowData.filter((row, i) => i !== index));
            setSelectedRow(null);
        }
    };

    const handleFormSubmit = (formValues) => {
        if (selectedRow) {
            const index = rowData.findIndex((row) => row === selectedRow);
            const updatedRow = { ...selectedRow, ...formValues };
            setRowData([...rowData.slice(0, index), updatedRow, ...rowData.slice(index + 1)]);
            setSelectedRow(null);
        } else {
            setRowData([...rowData, formValues]);
        }
        setShowForm(false);
    };

    const handleFormClose = () => {
        setShowForm(false);
    };

    const handleSelectionChanged = () => {
        const selectedRows = gridApi.getSelectedRows();
        setSelectedRow(selectedRows[0] || null);
    };

    const columnDefs = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Age', field: 'age' },
        { headerName: 'Email', field: 'email' },
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="ag-theme-material" style={{ height: '500px', width: '100%' }}>
                    <AgGridReact
                        onGridReady        = {handleGridReady}
                        rowData            = {rowData}
                        columnDefs         = {columnDefs}
                        rowSelection       = "single"
                        onSelectionChanged = {handleSelectionChanged}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAddRow}>Add Row</Button>
                <Button variant="contained" color="primary" onClick={handleEditRow} disabled={!selectedRow}>Edit Row</Button>
                <Button variant="contained" color="secondary" onClick={handleDeleteRow} disabled={!selectedRow}>Delete Row</Button>
            </Grid>
            <FormDialog open={showForm} onClose={handleFormClose} onSubmit={handleFormSubmit} rowData={selectedRow} />
        </Grid>
    );
};

export default AgGrid
