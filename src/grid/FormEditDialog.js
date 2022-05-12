import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const FormEditDialog = props => {

    return (
        <div>
            <Dialog
                open             = {props.open}
                onClose          = {props.handleClose}
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description" >
                <DialogTitle id  = "alert-dialog-title"> { props.data.id ? props.messages.update: props.messages.create } </DialogTitle>
                <DialogContent >
                    { props.colDefs.map( ( prop, index ) => {
                        return <TextField
                             key          = { index }
                             id           = { prop.field }
                             value        = { props.data.field }
                             onChange     = { e => props.onChange(e) }
                             defaultValue = { props.data.field}
                             placeholder  = { "Enter " + prop.headerName }
                             label        = { prop.headerName }
                             variant      = "outlined"
                             margin       = "dense"
                             fullWidth  />
                                })
                      }
                </DialogContent>
                <DialogActions>
                    <Button onClick = {props.handleClose} color = "secondary" variant              = "outlined"> Cancel </Button>
                    <Button  color  = "primary" onClick={props.handleFormSubmit} variant = "contained"> { props.data.id?"Update": "Submit"} </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default FormEditDialog;
