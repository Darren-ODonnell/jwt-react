import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import { useAxios } from "../api/ApiService";


const FormDialog = (props) => {
    // let [data, error, loading, axiosApi] = useAxios();

    // close popup window
    const handleClose = ( setOpen ) => {
        setOpen(false);
        // setFormData(props.initialValue);
    };
    const handleError = ( message ) => {
        return <ErrorMessage message={message}/>;

    }

    const updateData = ({methods, axiosApi, data, error, setFormData}) => {


        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken( user.accessToken );

        const configObj = {
            axiosInstance: instance,
            method: methods.update.method,
            url: methods.update.url,
            requestConfig: {
                data: data
            }

        }

        axiosApi(configObj)
            .then (response => {
                data = response.data
                setFormData(data)
            .catch(err=>{
                error = err.message;
            })
        })

    }
    const addData = ({methods, axiosApi, data, error, setFormData}) => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken( user.accessToken );


        let formInfo = new FormData()
        let data2 = {            name: 'new2',            season: '20232'        };

        // formData.append(...data2);
        formInfo.append('name','Test5');
        formInfo.append('season','2025')

        // formInfo.append(...data2)

        const dataStr = JSON.stringify(data2)

        const configObj = {
            axiosInstance: instance,
                method: methods.add.method,
                url: methods.add.url,
                requestConfig: {
                    data: data2
            }
        }

        console.log(configObj);

        axiosApi(configObj)
            .then (response => {

                // console.log(response.data);
                data = response.data
                setFormData([...data])
            .catch(err=>{
                error = err.message;
                })
            })
    }

    const handleFormSubmit = ({formData, methods, setOpen, error }) => {
        console.log('FormData: ', formData)
        const request = {...methods.add, data: formData};

        if (formData.id)  {// updating a record
            // const confirm = window.confirm("Are you sure, you want to update this row ?")
            // confirm && actions.update(formData.id, formData)
            setOpen(false)

            const request = methods.update;

            // let { error } = props.actions.list(props.formData);

            updateData( {...props, request});

            if (error !== null) {   return handleError(error.message); }

        } else { // adding new record
            setOpen(false)

            // const { error } = props.actions.add(props.formData);

            addData( {...props, request});

            if (error !== null) {   return handleError(error.message); }
        }
    }
    // form elements
    const onCancel = ({setOpen, initialValue, setFormData}) => {
        handleClose(setOpen)
        setFormData(initialValue);
        setOpen(false)
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

    return  !props.loading ? (
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