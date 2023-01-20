import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import {  DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import {refreshPage} from "../common/helper";
// import { DatePicker } from "antd";
// import { TimePicker } from 'antd';
// import moment from 'moment';
// import 'antd/dist/reset.css';



import DateTimePicker from "react-datetime-picker";
// import TimePicker from "react-timepicker";

// import "react-datepicker/dist/react-datepicker.css";


const FormDialog = (props) => {
    // close popup window
    const handleClose = (setOpen) => {
        setOpen(false);
        // setFormData(props.initialValue);
    };
    const handleError = (message) => {
        return <ErrorMessage message={message}/>;

    }
    const UpdateData = ({methods, axiosApi, data, error, formData}) => {

        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);

        const configObj = {
            axiosInstance: instance,
            ...methods.update,
            requestConfig: {
                data: formData
            }
        }

        axiosApi(configObj)
            .then(response => {
                data = response.data
                console.log("Update: ", data)
            })
            .catch(err => {
                error = err.message;
            })
        // refresh grid
        refreshPage()
        // window.location.reload()
    }
    const AddData = ({methods, axiosApi, data, error, formData, setOpen, setData}) => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);

        const configObj = {
            axiosInstance: instance,
            ...methods.add,
            requestConfig: {
                data: {...formData}
            }
        }


        axiosApi( configObj )
            .then( response => {
                setOpen( false )
                data = response.data
                console.log("Add: ", response.data)
                setData(data)
            })
            .catch(err => {
                error = err.message;
                setOpen(false)

            })
        // refresh grid
        refreshPage()
        // window.location.reload()
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

            UpdateData( {...props, request});

            if (error !== null) {   return handleError(error.message); }

        } else { // adding new record
            setOpen(false)

            // const { error } = props.actions.add(props.formData);

            AddData( {...props, request});

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
        console.log("default - textField")
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
    const competitionDropdown =  ( { index, field, formData, onChange, headerName }) => {
        // get competitions
        console.log("competitionDropDown")
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
    const clubDropdown =  ( { index, field, formData, onChange, headerName }) => {
        // get club data
        console.log("clubDropDown")

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
    const datePicker =  ( { index, field, formData, onChange, headerName }) => {
        console.log("datePicker: -> "+ formData.field)
        // add min and max dates
        // add min and max time


        return (
            <DateTimePicker
                // getPopupContainer = {FormDialog}
                // defaultValue = { moment(formData.field, 'dd:mm:yyyy') }
                key          = { index }
                disableClock = { true }
                // autoFocus    = { true }
                // closeWidget  = { true }
                format       = {'dd/mm/yyyy'}
                id           = { field }
                value        = { formData[field] }
                onChange     = { e => onChange(e) }
                data         = { formData }
                placeholder  = { "Enter " + headerName }
                label        = { headerName }
                variant      = "outlined"
                margin       = "dense"
                fullWidth
            />
        )
    }
    const timePicker =  ( { index, field, formData, onChange, headerName }) => {
        console.log("timePicker:" + formData.fixtureTime)
        return (
            <DateTimePicker
                // getPopupContainer = {FormDialog}
                // defaultValue={moment(formData, 'HH:mm:ss')}
                key             = { index }
                id              = { field }
                disableCalendar = {true}
                format          = {'hh:mm:ss'}
                value           = { formData[field] }
                onChange        = { e => onChange(e) }
                data            = { formData }
                placeholder     = { "Enter " + headerName }
                label           = { headerName }
                variant         = "outlined"
                margin          = "dense"
                fullWidth
            />

            // <TextField
            //     key         = { index }
            //     id          = { field }
            //     value       = { formData[field] }
            //     onChange    = { e => onChange(e) }
            //     data        = { formData }
            //     placeholder = { "Enter " + headerName }
            //     label       = { headerName }
            //     variant     = "outlined"
            //     margin      = "dense"
            //     fullWidth
            // />
        )
    }

    return  !props.loading ? (
          <div>
              {console.log(props)}
            <Dialog
                open             = { props.open}
                onClose          = { props.handleClose }
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description"
            >
                <DialogTitle id  = "alert-dialog-title"> { props.formData.id ? props.messages.update: props.messages.create }</DialogTitle>
                <DialogContent>  {

                        props.colDefs.map( ( prop, index ) => {
                            console.log(index)
                            switch(prop.type) {
                                case "Competition" :
                                    return competitionDropdown( { ...props, ...prop, index });
                                case "Club" :
                                    return clubDropdown( { ...props, ...prop, index });
                                case "Date":
                                    return datePicker( { ...props, ...prop, index });
                                case "Time":
                                    return timePicker( { ...props, ...prop, index });
                                default :
                                    return textField( { ...props, ...prop, index });

                            }


                            // return textField( { ...props, ...prop, index })
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