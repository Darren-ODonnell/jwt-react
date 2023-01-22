import React, {useState} from "react";
import {Button, Dialog, TextField} from "@mui/material";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {ErrorMessage} from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import {refreshPage} from "../common/helper";

// import { TimePicker, DatePicker,  TimePickerProps, DatePickerProps, Space } from "antd";
import moment from "moment";
import type from 'antd';
import {ConfigProvider} from 'antd'
// import ConfigProvider from 'antd/lib/config-provider'

import {Dayjs} from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker, TimePickerProps} from '@mui/x-date-pickers/TimePicker';
import {getTime} from "date-fns";

// import DateTimePicker from "react-datetime-picker";
// import TimePicker from "react-timepicker";
// import "react-datepicker/dist/react-datepicker.css";


const FormDialog = (props) => {
    // close popup window
    const [value, setValue] = useState();
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
        setValue(newValue);
    }

    const textField = ({index, field, formData, onChange, headerName}) => {
        console.log("default - textField")
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
        console.log("competitionDropDown")
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
        console.log("clubDropDown")
        return (
            <TextField
                key={index}
                id={field}
                value={formData[field]}
                onChange={e => onChange(e)}
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
        // console.log("datePicker: -> "+ formData.fixtureDate)
        // add min and max dates
        // add min and max time


        return (
            <div>

            </div>
            // <TimePicker onChange={this.onchange() } value={} renderInput={}
            // <DatePicker
            //
            //     // getPopupContainer = {FormDialog}
            //     style        = {{ position: 'absolute', width: "100%" }}
            //     defaultValue = { new Date("2023-01-20 18:22:00") }
            //     key          = { index }
            //     disableClock = { true }
            //     autoFocus    = { true }
            //     closeWidget  = { true }
            //     format       = { 'yyyy-mm-dd hh:mm:ss' }
            //     id           = { field }
            //     value        = { formData[field] }
            //     onChange     = { e => this.onChange(e) }
            //     data         = { formData }
            //     placeholder  = { "Enter " + headerName }
            //     label        = { headerName }
            //     variant      = "outlined"
            //     margin       = "dense"
            //     fullWidth
            // />

        )
    }
    const timePicker = ({index, field, formData, headerName}) => {
        // console.log("timePicker:" + formData.fixtureTime)
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    key={index}
                    style={{position: 'absolute', width: "100%"}}
                    // getPopupContainer = {FormDialog}
                    // defaultValue = { moment("2023-01-20 18:22:00", "yyyy-mm-dd hh:mm:dd") }
                    // defaultValue    = { moment(formData, 'HH:mm:ss')}

                    // setValue        = { formData[field] }
                    id={field}
                    disableCalendar={true}
                    format={'hh:mm:ss'}
                    value={formData[field]}
                    onChange={e => onChange(e)}
                    openTo={["hours,minutes"]}
                    data={formData}
                    placeholder={"Enter " + headerName}
                    label={headerName}
                    minutesStep={15}
                    variant="outlined"
                    margin="dense"
                    fullWidth

                    renderInput={(props) =>
                        <TextField {...props}
                            // key         = { index }
                            // id          = { field }
                            // value       = { formData[field] }
                                   minutesStep="15"
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

                {/*<TextField*/}
                {/*    key         = { index }*/}
                {/*    id          = { field }*/}
                {/*    value       = { formData[field] }*/}
                {/*    onChange    = { e => onChange(e) }*/}
                {/*    data        = { formData }*/}
                {/*    placeholder = { "Enter " + headerName }*/}
                {/*    label       = { headerName }*/}
                {/*    variant     = "outlined"*/}
                {/*    margin      = "dense"*/}
                {/*    fullWidth*/}
                {/*/>*/}
            </LocalizationProvider>
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
                            console.log(prop.field)
                            switch(prop.type) {

                                case "Competition" :
                                    // var competitions = getCompetitions(props);
                                    return competitionDropdown( { ...props, ...prop, index });
                                case "Club" :
                                    // var clubs = getClubs(props);
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