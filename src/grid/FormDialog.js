import React, { useState } from "react";
import { Button, Dialog, Grid, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";

// close popup window
const handleClose =         (setOpen) => {
    setOpen(false);
    // setFormData(props.initialValue);
};

const checkFormData = (data, props) => {
    console.log(data.toString());
    return true;

}

const handleFormSubmit = (formData, actions, setOpen, formColDefs) => {

    if (formData.id) { // updating a user
        const confirm = window.confirm("Are you sure, you want to update this row ?")
        confirm && actions.update(formData.id)
            .then( resp => {
                handleClose(setOpen);
                actions.list();
            } )
    } else { // adding new user
        const valid = checkFormData(formData, formColDefs)

        actions.add(formData)
            .then(resp => {
                handleClose(setOpen);
                actions.list();
            })
    }
}

const addEntityButton = (props) => {
    return (
        <>
            <Grid align="right">
                <Button variant="contained" color="primary" onClick={()=>handleClickOpen(props.setOpen)}>{props.messages.add}</Button>
            </Grid>
        </>
    )
}

const handleClickOpen =     (props) => {
    // setRowData(props.data);
    // setFormData(props.data);

    props.setOpen(true);

};


export const FormDialog = ({ open, setOpen, data, onChange, colDefs, messages, addButton}) => {
    // console.log(data)



    return (
        <div>
            { addButton() }
            <Dialog
                open             = { open }
                onClose          = {handleClose}
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description" >
                <DialogTitle id  = "alert-dialog-title"> { data.id ? messages.update: messages.create } </DialogTitle>
                <DialogContent >
                    { colDefs.map( ( prop, index ) => {
                        return <TextField
                             key         = { index }
                             id          = { prop.field }
                             value       = { data.field }
                             onChange    = { e => onChange(e) }
                             data        = {data}
                             placeholder = { "Enter " + prop.headerName }
                             label       = { prop.headerName }
                             variant     = "outlined"
                             margin      = "dense"
                             fullWidth  />
                                })
                      }
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)}
                            color   = "secondary"
                            variant = "outlined"
                    > Cancel </Button>
                    <Button  color   = "primary"
                             onClick = {()=>handleFormSubmit()}
                             variant = "contained"
                    > {data.id?"Update":"Submit"} </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
