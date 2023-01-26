import React, { useState } from "react";
import { Button, Dialog, MenuItem, TextField, Select } from "@mui/material";
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
import {
    DATE_FORMAT,
    getMaxDate, getMaxTime,
    getMinDate, getMinTime, getSeasons,
    MAX_TIME,
    MIN_TIME, ROUNDS,
    TIME_FORMAT,
    TIME_FORMAT_SAVE
} from "../common/globals";
import { AbcRounded } from "@mui/icons-material";




const FormDialog = (props) => {
    // close popup window



    const [value, setValue] = useState();
    const [dateValue, setDateValue] = useState(props.formData.fixtureDate);
    const [timeValue, setTimeValue] = useState(moment(props.formData.fixtureTime,TIME_FORMAT));

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

    function onChange(newValue) {
        const newDate = new Date(newValue)
        console.log("Time: " + value + " - " + newDate)
        setValue(newValue.toString());
    }
    const onChangeDate = (value, id) => {
        // update field with data from user
        // data updated here first, then screen is updated
        console.log(value)
        let dateStr = moment(value.$d,DATE_FORMAT)
        console.log(value + " - " + dateStr + " - " + id)
        setDateValue(dateStr);
        props.setFormData({...props.formData, [id]: value})
    }

    const onChangeTime = (value, id) => {
        // update field with data from user
        // data updated here first, then screen is updated
        let timeMs = moment(value.$d,TIME_FORMAT)
        console.log("Time: "+ timeMs + " - " + id)
        console.log(timeMs)
        let timeStr = moment(timeMs,TIME_FORMAT)
        // props.setFormData({...props.formData, [id]: moment(timeStr,TIME_FORMAT)})
        props.setFormData({...props.formData, [id]: timeMs.format(TIME_FORMAT_SAVE)})
        setTimeValue(timeMs)
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

                    key={index}
                    format={DATE_FORMAT}
                    id={field}
                    minDate={getMinDate()}
                    maxDate={getMaxDate()}
                    value={formData[field]}
                    onChange={e => onChangeDate(e, field)}
                    label={headerName}
                    renderInput={(props) =>
                        <TextField {...props}
                                   style={{borderStyle:'black', fontcolor:'black', position:'left', width:'50%'}}
                           id={field}

                        />}
                />
            </LocalizationProvider>
        )
    }

    const timePicker = ({index, field, formData, headerName, onChange, onTimeChange}) => {
        return (
            <LocalizationProvider key={index} dateAdapter={AdapterDayjs}>
                <TimePicker

                    // defaultValue={new Date("18:22:00")}
                    key={ index }
                    ampm={ false }
                    id={ field }
                    minTime = { getMinTime() }
                    maxTime = { getMaxTime() }
                    value={ moment(formData[field],TIME_FORMAT) }
                    onChange={ e => onChangeTime( e, field) }
                    openTo='hours'
                    placeholder={"Enter " + headerName }
                    label={ headerName }
                    minutesStep={ 15 }
                    renderInput={ (props) =>
                        <TextField {...props }
                                   style={{borderStyle:'black', fontcolor:'black', position:'absolute', width: "46%"}}
                           id={ field }
                        />}
                />
            </LocalizationProvider>
        )
    }

    const staticDropDown = ( onChange, field, formData, headerName, index, defaultValue, options ) => {
        console.log(options)
        return (
            <div>
                <Select
                    labelId={ index}
                    id={index}
                    // value={formData[field]}
                    label={headerName}
                    default={defaultValue}
                    // onChange={e => onChange(e)}
                >
                    {
                     options?.map( (entry) => <MenuItem value={entry.value}>{entry.value}</MenuItem> )


                    }
                    {/*<div style={{position:"right", width:"100%"}}>*/}
                    {/*<MenuItem style={{position:"right", width:"100%"}} value="1">1</MenuItem>*/}
                    {/*<MenuItem style={{width:"100%"}} value="2">2</MenuItem>*/}
                    {/*<MenuItem style={{width:"100%"}} value="3">3</MenuItem>*/}
                    {/*</div>*/}
                </Select>
            </div>
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
                            case "Round":
                                let roundProps = {options : ROUNDS, defaultValue : 1}
                                return staticDropDown({...props, ...prop, index, ...roundProps});
                            case "Season":
                                let seasonProps = {options:getSeasons(), defaultValue:new Date().getFullYear()}
                                return staticDropDown({...props, ...prop, index, ...seasonProps});
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