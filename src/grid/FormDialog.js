import React, { useState } from "react";
import { Button, Dialog, MenuItem, TextField, Select, FormControl, InputLabel } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import {
    refreshPage, getUniqueId, getSeasons,
    getMaxDate, getMaxTime, getMinDate, getMinTime,
} from "../common/helper";

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import {DATE_FORMAT, ROUNDS, TIME_FORMAT, TIME_FORMAT_SAVE} from "../common/globals";
import DropDown from '../formcomponents/DropDown'
import MyTimePicker from "../formcomponents/MyTimePicker";
import MyDatePicker from "../formcomponents/MyDatePicker";
import MyTextField from "../formcomponents/MyTextField";

const FormDialog = (props) => {
    const [value, setValue] = useState()
    const [dateValue, setDateValue] = useState(props.formData.fixtureDate)
    const [timeValue, setTimeValue] = useState(moment(props.formData.fixtureTime, TIME_FORMAT))
    // const [selected , setSelected]  = useState( props.defaultValue )
    const [formData, setFormData] = useState(props.formData)

    const handleClose = (setOpen) => {
        setOpen(false);
        // setFormData(props.initialValue);
    };
    const handleError = (message) => {
        return <ErrorMessage message={message}/>;

    }
    const handleFormSubmit = ({formData, methods, setOpen, error}) => {
        console.log('FormData: ', formData)
        const request = {...methods.add, data: formData};

        if (formData.id)  {// updating a record
            // const confirm = window.confirm("Are you sure, you want to update this row ?")
            // confirm && actions.update(formData.id, formData)
            setOpen(false)
            const request = methods.update;
            UpdateData( {...props, request});
            if (error !== null) {   return handleError(error.message); }

        } else { // adding new record
            setOpen(false)
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
                    color="primary"
                    variant="outlined"
            >Submit</Button>
        )
    }

    function onChange(e) {
        console.log("New Value: " + e.target.value)
        setValue(e.target.value.toString());
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

    return !props.loading ? (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"> {props.formData.id ? props.messages.update : props.messages.create}</DialogTitle>
                <DialogContent dividers>{

                    props.colDefs.map((prop, index) => {
                        let options = ""
                        switch (prop.type) {
                            // case "Competition" :
                            //     return competitionDropdown({...props, ...prop, index});
                            // case "Club" :
                            //     return clubDropdown({...props, ...prop, index});
                            case 'Date':
                                return <MyDatePicker
                                            key        = {getUniqueId() + 100 + ''}
                                            formData   = {props.formData}
                                            field      = {prop.field}
                                            headerName = {"Date"}/>;
                            case 'Time':
                                return <MyTimePicker
                                            key        = {getUniqueId()}
                                            formData   = {props.formData}
                                            field      = {prop.field}
                                            headerName = {"Time"}/>;
                            case "Round":
                                options  = ROUNDS
                                return <DropDown
                                            key        = { getUniqueId() + 300 + ''}
                                            formData   = { props.formData }
                                            field      = { prop.field }
                                            headerName = { "Round" }
                                            options    = { options }/>
                            case "Season":
                                options = getSeasons()
                                return <DropDown
                                            key        = { getUniqueId() }
                                            formData   = { props.formData }
                                            field      = { prop.field }
                                            headerName = {"Season" }
                                            options    = { options }/>
                            default:

                                return <MyTextField
                                    key={getUniqueId()}
                                    index={index}
                                    formData={props.formData}
                                    field={prop.field}
                                    headerName={"Season"}/>
                            // textField({...props, ...prop, index});
                        }
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
