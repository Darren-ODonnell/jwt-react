import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import { useAxios } from "../api/ApiService";


const FormDialog = (props) => {
    let [ data, error, loading, axiosFetch] = useAxios();

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

        const configObj = {
            axiosInstance: instance,
            ...props.methods.update
        }

        axiosFetch( configObj )
            .then (response => {
                data = response.data
                props.setFormData(data)
            .catch(err=>{
                error = err.message;
            })
        })

    }
    const addData = () => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken( user.accessToken );

        const configObj = {
            axiosInstance: instance,
            ...props.methods.add
        }

        axiosFetch( configObj )
            .then (response => {
                data = response.data
                props.setFormData([...props.data])
            .catch(err=>{
                error = err.message;
                })
            })
    }

    const handleFormSubmit = () => {
        console.log('FormData: ', props.formData)

        if (props.formData.id)  {// updating a record
            // const confirm = window.confirm("Are you sure, you want to update this row ?")
            // confirm && actions.update(formData.id, formData)
            props.setOpen(false)

            const request = props.methods.update;

            // let { error } = props.actions.list(props.formData);

            updateData( {...props, request});

            if (error !== null) {   return handleError(error.message); }

        } else { // adding new record
            props.setOpen(false)
            const request = props.methods.add;

            // const { error } = props.actions.add(props.formData);

            addData( {...props, request});

            if (error !== null) {   return handleError(error.message); }
        }
    }
    // form elements
    const onCancel = () => {
        handleClose(props.setOpen)
        props.setFormData(props.initialValue);
        props.setOpen(false)
    }
    const CancelButton = (props) => {
        return (
            <Button onClick={ () => onCancel(props) }
                    color   = "secondary"
                    variant = "outlined"
            > Cancel </Button>
        )
    }
    const SubmitButton = (props) => {
        return (
            <Button onClick={() => handleFormSubmit(props)}
                    type="submit"
                    color   = "primary"
                    variant = "outlined"
            >Submit</Button>
        )
    }

    const textField = ( { index, field, formData, onChange, headerName }) => {
        return (
            <TextField
                key         = { index }
                id          = { field }
                value       = { formData[field] }
                onChange    = { e => onChange(e) }
                data        = { formData }
                placeholder = { "Enter " + headerName }
                label       = { headerName }
                variant     = "outlined"
                margin      = "dense"
                fullWidth
            />
        )
    }

    return  !loading ? (
          <div>
            <Dialog
                open             = { props.open}
                onClose          = { props.handleClose }
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description"
            >
                <DialogTitle id  = "alert-dialog-title"> { props.formData.id ? props.messages.update: props.messages.create }</DialogTitle>
                <DialogContent >
                    {
                        props.colDefs.map( ( prop, index ) => {
                            return textField( { ...props, ...prop, index })
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <CancelButton {...props} />
                    <SubmitButton {...props} />
                </DialogActions>
            </Dialog>
        </div>
    ): <p>Loading...</p>
}
export default FormDialog;