import React, { useState } from "react";
import { Button, Dialog, MenuItem, TextField, Select, FormControl, InputLabel } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ErrorMessage } from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import { refreshPage, getUniqueId, getSeasons,
         getMaxDate, getMaxTime, getMinDate, getMinTime,} from "../common/helper";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import { DATE_FORMAT, ROUNDS, TIME_FORMAT, TIME_FORMAT_SAVE} from "../common/globals";


const FormDialog = (props) => {
    const [value, setValue] = useState();
    const [dateValue, setDateValue] = useState( props.formData.fixtureDate );
    const [timeValue, setTimeValue] = useState( moment( props.formData.fixtureTime, TIME_FORMAT ) );
    const [selected, setSelected] = useState(props.defaultValue);


    const handleClose = (setOpen) => {
        setOpen(false);
        // setFormData(props.initialValue);
    };
    const handleError = (message) => {
        return <ErrorMessage message={message}/>;

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

    function onChange(e) {

        console.log("New Value: " + e.target.value)
        setValue(e.target.value.toString());
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


        props.setFormData({...props.formData, [id]: timeMs.format(TIME_FORMAT_SAVE)})
        setTimeValue(timeMs)
    }
    const onSelectChange = (e) => {
        setSelected(e.target.value)
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
                onChange    = {e => onChange(e)}
                data        = {formData}
                placeholder = {"Enter " + headerName}
                label       = {headerName}
                variant     = "outlined"
                margin      = "dense"
                fullWidth
            />
        )
    }
    const clubDropdown = ({index, field, formData, onChange, headerName}) => {
        // get club data
        // console.log("clubDropDown")
        return (
            <TextField
                key         = {index}
                id          = {field}
                value       = {formData[field]}
                onChange    = {e => onChange(e)}
                data        = {formData}
                placeholder = {"Enter " + headerName}
                label       = {headerName}
                variant     = "outlined"
                margin      = "dense"
                fullWidth
            />
        )
    }
    const datePicker = ({index, field, formData, headerName}) => {
        return (
            <LocalizationProvider key={index} dateAdapter={AdapterDayjs}>
                <DatePicker

                    key      = {index}
                    format   = {DATE_FORMAT}
                    id       = {field}
                    minDate  = {getMinDate()}
                    maxDate  = {getMaxDate()}
                    value    = {formData[field]}
                    onChange = {e => onChangeDate(e, field)}
                    label    = {headerName}
                    renderInput={(props) =>
                        <TextField {...props}
                           style={{borderStyle:'black', fontcolor:'black', position:'left', width:'50%'}}
                           id={field}

                        />}
                />
            </LocalizationProvider>
        )
    }
    const timePicker = ({index, field, formData, headerName }) => {
        return (
            <LocalizationProvider key={index} dateAdapter={AdapterDayjs}>
                <TimePicker
                    // defaultValue={new Date("18:22:00")}
                    key         = { index }
                    ampm        = { false }
                    id          = { field }
                    minTime     = { getMinTime() }
                    maxTime     = { getMaxTime() }
                    value       = { moment(formData[field], TIME_FORMAT) }
                    onChange    = { e => onChangeTime( e  , field) }
                    openTo      = 'hours'
                    placeholder = {"Enter " + headerName }
                    label       = { headerName }
                    minutesStep = { 15 }
                    renderInput = { (props) =>
                        <TextField {...props }
                                   style={{borderStyle:'black', fontcolor:'black', position:'absolute', width: "46%"}}
                           id={ field }
                        />}
                />
            </LocalizationProvider>
        )
    }

    const staticDropDown = ( props) => {
        console.log("Field: "+props.field)
        console.log("FormData: " + props.formData)
        console.log("Options: " + props.options)
        return (
            <FormControl  key      = {getUniqueId()} style={{marginTop:5, marginBottom:2, width:'100%'}}>
                <InputLabel>{props.headerName}</InputLabel>
                <Select
                    // value={(selected) ? selected : props.defaultValue}
                    value={props.defaultValue}
                    onChange = {e => onSelectChange(e)}
                >
                    {
                        props.options.map( (entry) =>
                        <MenuItem
                            key={getUniqueId()+100+''}
                            value={entry}>{entry}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        )
    }



    return  !props.loading ? (
          <div>
            <Dialog

                open             = { props.open}
                onClose          = { handleClose }
                aria-labelledby  = "alert-dialog-title"
                aria-describedby = "alert-dialog-description"
            >
                <DialogTitle id  = "alert-dialog-title"> { props.formData.id ? props.messages.update: props.messages.create }</DialogTitle>
                <DialogContent>  {

                    props.colDefs.map(( prop, index ) => {
                        let displayValue = ""
                        displayValue  = props.formData[prop.field]
                        switch (prop.type) {
                            // case "Competition" :
                            //     return competitionDropdown({...props, ...prop, index});
                            // case "Club" :
                            //     return clubDropdown({...props, ...prop, index});
                            // case "Date":
                            //     return datePicker({...props, ...prop, index});
                            // case "Time":
                            //     return timePicker({...props, ...prop, index});
                            case "Round":
                                let roundProps = {  options : ROUNDS, defaultValue : displayValue}
                                return staticDropDown({...props, ...prop, index, ...roundProps});
                            case "Season":

                                let seasonProps = { options : getSeasons(), defaultValue : displayValue}
                                return staticDropDown({...prop, ...props, ...seasonProps, index});
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


{/*{*/}


{/*}*/}