import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

const FormDialog = ({ open, onClose, onSubmit, rowData }) => {
    const [formValues, setFormValues] = useState(rowData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formValues);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{rowData ? 'Edit Row' : 'Add Row'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        value={formValues.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="age"
                        label="Age"
                        value={formValues.age}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={formValues.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="form" color="primary">{rowData ? 'Save' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;


// ==============================
// another attempt at a form

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
};

const MyForm = () => {
    const [formState, setFormState] = useState(initialFormState);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', formState);
        setFormState(initialFormState);
        handleClose();
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Open form
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>My Form</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField label="First name" name="firstName" value={formState.firstName} onChange={handleInputChange} />
                        <TextField label="Last name" name="lastName" value={formState.lastName} onChange={handleInputChange} />
                        <TextField label="Email" name="email" value={formState.email} onChange={handleInputChange} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyForm;
