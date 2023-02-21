import React, { useEffect, useState } from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TextField} from "@mui/material";
import './FormDialog.css'

import {
    refreshPage, getUniqueId,
} from "../common/helper";


import MyTextField from "../formcomponents/MyTextField";
import MyTextField2 from "../formcomponents/MyTextField2";


const FormDialog3 = ({ openForm, onClose, onSubmit, rowData, setData, handleClose, colDefs, initialValue, error, methods, loading, setFormData }) => {
    const [formValues, setFormValues] = useState(colDefs)

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormValues({ ...formValues, [name]: value });
    // };
    const CancelButton = (props) => {
        return (
            <Button onClick={ () => handleCancel(props) }
                    color   = "secondary"
                    variant = "outlined"
            > Cancel </Button>
        )
    }
    const handleCancel = () => {
        handleClose()
        setFormValues(initialValue);

    }
    const SubmitButton = ({formValues, methods, setOpen, error}) => {
        return (
            <>
                <Button onClick={() => handleSubmit}
                        type="submit"
                        color="primary"
                        variant="outlined"
                >Submit</Button>
            </>
        )
    }
    useEffect(() => {
        console.log("Open: + " + open)
    }, [open]);



    //
    // const handleDialogEnter = () => {
    //     console.log("Inside Dialog")
    // }
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formValues);
    };
    // console.log("ColDefs: "+colDefs)

    return (

            <div> Testing
                  <Dialog

                    // className="scroll"
                    // style={scroll}
                    //     id={getUniqueId()}
                        open={openForm}
                        onClose={onClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                >
                      <DialogContent dividers>
                          <TextField
                             />
                        </DialogContent>
                    <DialogActions>
                        <CancelButton setOpen={setOpen} initialValue={initialValue} setFormValues={setFormValues} />
                        <SubmitButton formValue={formValues} methods={methods} setOpen={setOpen} error={error} />
                    </DialogActions>
                </Dialog>
            </div>

    );
}
export default FormDialog3;


