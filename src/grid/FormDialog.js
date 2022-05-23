import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";

// close popup window
const handleClose = ( setOpen ) => {
    setOpen(false);
    // setFormData(props.initialValue);
};
const handleError = ( message ) => {
    return <ErrorMessage message={message}/>;

}

const updateData = (props) => {

    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken( user.accessToken );

    props.axiosFetch( {
        axiosInstance: instance,
        method: props.method,
        url: props.url
    }).then (()=> {
        props.setFormData([...props.data]);
    })



}
const addData = (props) => {

}

const cancelData = () => {

}


const handleFormSubmit = (props) => {
    console.log('FormData: ', props.formData)

    if (props.formData.id) { // updating a record
        // const confirm = window.confirm("Are you sure, you want to update this row ?")
        // confirm && actions.update(formData.id, formData)
        props.setOpen(false)

        // let { error } = props.actions.list(props.formData);

        let { error } = updateData(props.axiosFetch, props.methods.update, props.formData)

        if (error !== null) {   return handleError(error.message); }

    } else { // adding new record
        props.setOpen(false)

        // const { error } = props.actions.add(props.formData);

        let { error } = updateData(props.axiosFetch, props.methods.add, props.formData)

        if (error !== null) {   return handleError(error.message); }
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
        value       = { props.formData[prop.field] }
        onChange    = { e => props.onChange(e) }
        data        = { props.formData }
        placeholder = { "Enter " + prop.headerName }
        label       = { prop.headerName }
        variant     = "outlined"
        margin      = "dense"
        fullWidth  />
    )
}

// { open, setOpen, data, onChange, colDefs, messages}
export const FormDialog = (props) => {
    // console.log(props.formData)

    return (
         <div>
            <Dialog
                open             = { props.open }
                onClose          = { props.handleClose }
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description" >
                <DialogTitle id  = "alert-dialog-title"> { props.formData.id ? props.messages.update: props.messages.create } </DialogTitle>
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
// export default FormDialog;