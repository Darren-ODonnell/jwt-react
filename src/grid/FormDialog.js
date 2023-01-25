import React, { useState } from "react";
import { Button, Dialog, TextField} from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import { refreshPage } from "../common/helper";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import moment from "moment";



const FormDialog = (props) => {
    // close popup window
    const [value, setValue] = useState();
    const [dateValue, setDateValue] = useState(moment().format('YYYY-MM-DD'));
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
                    color="primary"
                    variant="outlined"
            >Submit</Button>
        )
    }

    function onChange(newValue) {
        const newDate = new Date(newValue)
        console.log("Time: " + value + " - " + newDate)
        setValue(newValue.toString());
    }

    const onChangeDate = (date) => {
        const newDate = moment(date.timeStamp).format('YYYY-MM-DD');
        setValue(newDate);
        console.log(newDate); //always log "1970-01-01"
    };
    const textField = ({index, field, formData, onChange, headerName}) => {
        // console.log("default - textField")
        return (
            <TextField
                key={index}
                id={field}
                value={formData[field]}
                onChange={e => onChange(e)}

                data={formData}
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
        // console.log("competitionDropDown")
        return (
            <TextField
                key         = { index }
                id          = { field }
                value       = { formData[field] }
                onChange={e => onChange(e)}
                data={formData}
                placeholder={"Enter " + headerName}
                label={headerName}
                variant="outlined"
                margin="dense"
                fullWidth
            />
        )
    }

    // function getCompetitions(props) {
    //     const user = AuthService.getCurrentUser();
    //     AuthService.setAuthToken(user.accessToken);
    //
    //     const configObj = {
    //         axiosInstance: instance,
    //          ...props.methods.getCompetitions,
    //         requestConfig: {
    //             data: {...props.formData}
    //         }
    //     }
    //     props.axiosApi( configObj )
    //         .then( response => {
    //             props.setOpen( false )
    //             props.data = response.data
    //             console.log("Competitions: ", response.data)
    //             props.setData(props.data)
    //         })
    //         .catch(err => {
    //             props.error = err.message;
    //             props.setOpen(false)
    //
    //         })
    //     console.log(props.data)
    //
    //     return props.data;
    //
    // }
    // function getClubs(props) {
    //     const user = AuthService.getCurrentUser();
    //     AuthService.setAuthToken(user.accessToken);
    //
    //     const configObj = {
    //         axiosInstance: instance,
    //         ...props.methods.getClubs,
    //         requestConfig: {
    //             data: {...props.formData}
    //         }
    //     }
    //     props.axiosApi( configObj )
    //         .then( response => {
    //             props.setOpen( false )
    //             props.data = response.data
    //             console.log("Clubs: ", response.data)
    //             props.setData(props.data)
    //         })
    //         .catch(err => {
    //             props.error = err.message;
    //             props.setOpen(false)
    //
    //         })
    //     console.log(props.data)
    //
    //     return props.data;
    // }

    const clubDropdown = ({index, field, formData, onChange, headerName}) => {
        // get club data
        // console.log("clubDropDown")
        return (
            <TextField
                key={index}
                id={field}
                value={formData[field]}
                onChange={e => onChange(e)}
                data={formData}
                placeholder={"Enter " + headerName}
                label={headerName}
                variant="outlined"
                margin="dense"
                fullWidth
            />
        )
    }
    const datePicker = ({index, field, formData, onDateChange, headerName}) => {
        return (
            <LocalizationProvider key={index} dateAdapter={AdapterDayjs}>
                <DatePicker

                    // getPopupContainer = {FormDialog}
                    style={{position: 'absolute', width: "100%"}}
                    defaultValue={new Date("2023-01-20 18:22:00")}
                    key={index}
                    disableClock={true}
                    autoFocus={true}
                    closeWidget={true}
                    format={'yyyy-mm-dd hh:mm:ss'}
                    id={field}
                    value={formData[field]}
                    // onChange={onChangeDate}
                    onChange={e => onDateChange(e, field)}
                    data={formData}
                    placeholder={"Enter " + headerName}
                    label={headerName}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    renderInput={(props) =>
                        <TextField {...props}
                            // key         = { index }
                                   id={field}
                            // value       = { formData[field] }
                            //        openTo="hours,minutes"

                            // onChange    = { e => onChange(e) }
                            // fullwidth = { true }
                            // data        = { formData }
                            // placeholder = { "Enter " + headerName }
                            // label       = { headerName }
                            // variant     = "outlined"
                            // margin      = "dense"
                            // fullWidth
                        />}
                />
            </LocalizationProvider>

        )
    }

    const timePicker = ({index, field, formData, headerName, onChange, onTimeChange}) => {
        return (
            <LocalizationProvider key={index} dateAdapter={AdapterDayjs}>
                <TimePicker
                    style={{position: 'absolute', width: "100%"}}
                    defaultValue={new Date("2023-01-20 18:22:00")}
                    // defaultValue = { moment("2023-01-20 18:22:00", "yyyy-mm-dd hh:mm:dd") }
                    key={index}
                    setValue={formData[field]}
                    id={field}
                    disableCalendar={true}
                    format={'hh:mm:ss'}
                    value={formData[field]}
                    onChange={e => onChange(e, field)}
                    openTo='hours'
                    data={formData}
                    placeholder={"Enter " + headerName}
                    label={headerName}
                    minutesstep={15}
                    variant="outlined"
                    margin="dense"
                    appendToInput={true}
                    z-index={100000000}
                    fullWidth

                    renderInput={(props) =>
                        <TextField {...props}
                                   id={field}
                            // value       = { formData[field] }
                            //        openTo="hours,minutes"
                            // onChange    = { e => onChange(e) }
                            // fullwidth = { true }
                            // data        = { formData }
                            // placeholder = { "Enter " + headerName }
                            // label       = { headerName }
                            // variant     = "outlined"
                            // margin      = "dense"
                            // fullWidth
                        />}
                />

            </LocalizationProvider>
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
                <DialogContent>  {

                    props.colDefs.map(( prop, index ) => {
                        switch (prop.type) {
                            case "Competition" :
                                return competitionDropdown({...props, ...prop, index});
                            case "Club" :
                                return clubDropdown({...props, ...prop, index});
                            case "Date":
                                return datePicker({...props, ...prop, index});
                            case "Time":
                                return timePicker({...props, ...prop, index});
                            default:
                                return textField({...props, ...prop, index})
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