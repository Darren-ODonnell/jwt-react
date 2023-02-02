import React, { useState } from "react";
import { Button, Dialog, MenuItem, TextField, Select, FormControl, InputLabel } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle, GridListTile } from "@mui/material";

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
import {
    DATE_FORMAT, ROUNDS, GRADES, SUCCESS,
    TIME_FORMAT, TIME_FORMAT_SAVE, HALF, POSITIONS,
    PLAYER_NUMBERS, REGISTERED, AVAILABILITY, PITCH_GRIDS,
    COMPETITIONS
} from "../common/globals";
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
    const scroll = {
        overflowX: 'scroll',
        overflowY: 'scroll',
    }


    const dropDown = {
        width: '50%',
        height: '50%',
        overflowY: 'auto',

    }


    return !props.loading ? <div>
            <Dialog
                style={scroll}
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"> {props.formData.id ? props.messages.update : props.messages.create}</DialogTitle>
                <DialogContent dividers >
                {
                    props.colDefs.map(prop => {
                        let options = ""
                        const commonProps = {
                            style   : dropDown,
                            formData: props.formData,
                            field   : prop.field,
                            type    : prop.type,
                            key     : getUniqueId(),
                            defaultValue : props.formData[prop.field],
                        }
                        switch (prop.field) {
                            // case "awayTeamName" :
                            // case "homeTeamName" :
                            //     return clubDropdown({...props, ...prop, index});
                            // // case "playerName" :
                            // //     return playerNameDropDown()
                            // // case "statname" :
                            // //     return
                            case "half" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"First/Second Half"}
                                    options={HALF}/>
                            case "registered":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Registered"}
                                    options={REGISTERED}/>
                            case "grade":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Grade"}
                                    options={GRADES}/>
                            case "availability":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Availability"}
                                    options={AVAILABILITY}/>
                            case "pitchgrid":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Pitchgrid"}
                                    options={PITCH_GRIDS}/>;
                            case "success":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Success"}
                                    options={SUCCESS}/>
                            case "position":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Position"}
                                    options={POSITIONS}/>
                            case "positionNumber":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Position Number"}
                                    options={PLAYER_NUMBERS} />
                            case "competitionName":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Competition Name"}
                                    options={COMPETITIONS} />

                            case "round":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Round"}
                                    options={ROUNDS} />
                            case "season":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Season"}
                                    options={getSeasons()} />
                            case 'fixtureDate':
                                return <MyDatePicker
                                    {...commonProps}
                                    headerName={"Date"} />
                            case 'fixtureTime':
                                return <MyTimePicker
                                    {...commonProps}
                                    headerName={"Time"} />
                            default:
                                return <MyTextField
                                    {...commonProps}
                                    headerName     = {prop.headerName}/>
                        }
                    })
                }
                </DialogContent>
                <DialogActions>
                    <CancelButton {...props} />
                    <SubmitButton {...props} />
                </DialogActions>
            </Dialog>
        </div>: <p>Loading...</p>
}
export default FormDialog;
