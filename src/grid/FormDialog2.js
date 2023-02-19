import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';

const FormDialog = ({open, onClose, onSubmit, rowData}) => {
    const [formValues, setFormValues] = useState(rowData);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formValues);
    };

    console.log("FormDialog2: ")
    console.log("formValues2: " + formValues)
    console.log("rowData2: " + rowData)
    console.log("open2: " + open)
    return (
        formValues ?
            <div>
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>{formValues ? 'Edit Row' : 'Add Row'}</DialogTitle>
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
            </div>
            :
            <div> waiting...</div>
    );
};

export default FormDialog;
