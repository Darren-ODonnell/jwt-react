import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const MyTextField = ({ label, value, onChange }) => {
    return (
        <TextField label={label} value={value} onChange={onChange} />
    );
};

const MyFormDialog = ({ open, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSave = () => {
        onSave({ name, age });
        setName('');
        setAge('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Person</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the person's name and age.
                </DialogContentText>
                <MyTextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <MyTextField label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const AgGrid = () => {
    const [rowData, setRowData] = useState([]);
    const [showFormDialog, setShowFormDialog] = useState(false);

    const handleSavePerson = (person) => {
        setRowData([...rowData, person]);
        setShowFormDialog(false);
    };

    const columnDefs = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Age', field: 'age' },
    ];

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <Button onClick={() => setShowFormDialog(true)}>Add Person</Button>
            <AgGridReact columnDefs={columnDefs} rowData={rowData} />
            <MyFormDialog open={showFormDialog} onClose={() => setShowFormDialog(false)} onSave={handleSavePerson} />
        </div>
    );
};
