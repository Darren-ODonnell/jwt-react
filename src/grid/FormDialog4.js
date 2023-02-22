import React, { useEffect, useState } from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import './FormDialog.css'

import {
    refreshPage, getUniqueId,
} from "../common/helper";


import MyTextField from "../formcomponents/MyTextField";

const FormDialog4 = ({ open, onClose, onSubmit, rowData, setData, colDefs, handleClose, handleSubmit,
                        initialValue, error, setOpen, methods, loading }) => {
    const [formValues, setFormValues] = useState()
    // const [formValues, setFormValues] = useState(initialValue)

    const handleFormSubmit = ({formValues, methods, setOpen, error}) => {
    }
    const handleChange2 = (event) => {
        setFormValues([...rowData, [event.target.id] = event.target.value])
        setOpen(false);
    };

    const CancelButton = () => {
        return (
            <Button onClick={ () => handleClose() }
                    color   = "secondary"
                    variant = "outlined"
            > Cancel </Button>
        )
    }
    const SubmitButton = ({formValues, methods, setOpen, error}) => {
        return (
            <>
                <Button onClick={() => handleFormSubmit({formValues, methods, setOpen, error})}
                        type="submit"
                        color="primary"
                        variant="outlined"
                >Submit</Button>
            </>
        )
    }


    useEffect(() => {
        setFormValues(rowData);
    }, [rowData]);

    return  (
        <div>
            <Dialog
                className="scroll"
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {console.log("RowData2: " + JSON.stringify(rowData))}
                <DialogContent dividers>
                    {colDefs.map(prop => {
                        switch (prop.field) {
                            default:
                                return <MyTextField
                                    headerName={prop.headerName}
                                    value={formValues ? formValues[prop.field] : undefined}
                                    onChange={handleChange2}
                                    key={getUniqueId()}
                                    handleClose={handleClose}
                                />
                        }
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <CancelButton setOpen={setOpen} initialValue={initialValue} setFormValues={setFormValues} />
                    <SubmitButton formValue={formValues} methods={methods} setOpen={setOpen} error={error} />
                </DialogActions>
            </Dialog>
        </div>

    );
}
export default FormDialog4;
