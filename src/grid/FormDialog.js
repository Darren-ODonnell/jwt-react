import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";

// close popup window
const handleClose =         (setOpen) => {
    setOpen(false);
    // setFormData(props.initialValue);
};

// , formData, actions, setOpen, formColDefs
const handleFormSubmit = ({ setOpen, formData, actions, initialValue, setFormData }) => {
    let data = {...formData}
    console.log('FormData: ',data)

    if (formData.id) { // updating a record
        // const confirm = window.confirm("Are you sure, you want to update this row ?")
        // confirm && actions.update(formData.id, formData)
        actions.update(formData)
            .then( resp => {
                // close form
                setOpen( false );
                // clear form data
                setFormData( initialValue );
                console.log( resp );
                }
            );

    } else { // adding new record
        // const valid = checkFormData(formData, formColDefs)

        actions.add(formData)
            .then(resp => {
                handleClose(setOpen);
                setOpen(false)
                actions.add();
                setFormData(initialValue);
                console.log(resp)
            })
    }

}
// form elements
const onCancel = (props) => {
    props.setFormData(props.initialValue);
    props.setOpen(false)
}
const cancelButton = (props) => {

    return (
        <Button onClick={ () => onCancel(props) }
                color   = "secondary"
                variant = "outlined"
        > Cancel </Button>
    )
}
const submitButton = (props) => {
    return (
        <Button onClick={() => handleFormSubmit(props)}
                type="submit"
                color   = "primary"
                variant = "outlined"
        >Submit</Button>
    )
}
const textField = (props, index, prop) => {

    return (
        <TextField
        key         = { index }
        id          = { prop.field }
        value       = { props.data[prop.field] }
        onChange    = { e => props.onChange(e) }
        data        = { props.data }
        placeholder = { "Enter " + prop.headerName }
        label       = { prop.headerName }
        variant     = "outlined"
        margin      = "dense"
        fullWidth  />
    )
}

export const FormDialog = (props) =>  {
    // export const FormDialog = ({ open, setOpen, data, onChange, colDefs, messages, addButton}) => {
    console.log(props.data)

    return (
        <div>
            { props.addButton() }
            <Dialog
                open             = { props.open }
                onClose          = { handleClose }
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description" >
                <DialogTitle id  = "alert-dialog-title"> { props.data.id ? props.messages.update: props.messages.create } </DialogTitle>
                <DialogContent >
                    { props.colDefs.map( ( prop, index ) => {
                        return <TextField
                             key         = { index }
                             id          = { prop.field }
                             value       = { props.data.field }
                             onChange    = { ( e ) => props.onChange(e) }
                             data        = { props.data }
                             placeholder = { "Enter " + prop.headerName }
                             label       = { prop.headerName }
                             variant     = "outlined"
                             margin      = "dense"
                             fullWidth  />
                             })
                      }
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => props.setOpen(false) }
                            color   = "secondary"
                            variant = "outlined"
                    > Cancel </Button>
                    <Button  type="submit"
                             color   = "primary"
                             onClick = { handleFormSubmit }
                             variant = "contained"
                    > {props.data.id ? "Update" : "Submit" } </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
// { open, setOpen, data, onChange, colDefs, messages}
export const FormDialog2 = (props) => {
    // console.log(data)

    return (
         <div>
            <Dialog
                open             = { props.open }
                onClose          = { props.handleClose }
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description" >
                <DialogTitle id  = "alert-dialog-title"> { props.data.id ? props.messages.update: props.messages.create } </DialogTitle>
                <DialogContent >
                    { props.colDefs.map( ( prop, index ) => {
                        return textField(props, index, prop)
                        })
                    }
                </DialogContent>
                <DialogActions>
                    { cancelButton(props) }
                    { submitButton(props) }
                </DialogActions>
            </Dialog>
        </div>

    );
}
