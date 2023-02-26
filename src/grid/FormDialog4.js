import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import './FormDialog.css'
import '../formcomponents/textfield.css'

import MyTextField from "../formcomponents/MyTextField";
import {getSeasons, refreshPage} from "../common/helper";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import {ErrorMessage} from "../common/ErrorMessage";
import MyTimePicker from "../formcomponents/MyTimePicker";
import MyDatePicker from "../formcomponents/MyDatePicker";
import DropDown from "../formcomponents/DropDown";
// import DropDownData from "../formcomponents/DropDownData";

import {
    AVAILABILITY, COMPETITIONS,
    GRADES,
    HALF,
    PITCH_GRIDS,
    PLAYER_NUMBERS,
    POSITIONS,
    REGISTERED, ROUNDS,
    SUCCESS
} from "../common/globals";
import DropDownData from "../formcomponents/DropDownData";

const FormDialog4 = ({
                         open, onClose, messages, onSubmit, rowData, data, setData, colDefs, handleClose, handleSubmit,
                         initialValue, error, setOpen, methods, loading, axiosApi, setRowData
                     }) => {
    const [formValues, setFormValues] = useState({initialValue})

    let dropDownData = DropDownData()

    const handleFormSubmit = ({formValues, error}) => {
        console.log('FormValues: ', formValues)
        const request = {...methods.add, data: formValues};

        if (formValues.id) {// updating a record
            // const confirm = window.confirm("Are you sure, you want to update this row ?")
            // confirm && actions.update(formData.id, formData)
            setOpen(false)
            const request = methods.update;
            UpdateData({methods, axiosApi, rowData, error, formValues, request});
            if (error !== null) {
                return handleError(error.message);
            }

        } else { // adding new record
            setOpen(false)
            AddData({methods, axiosApi, rowData, error, formValues, setOpen, setRowData, request});
            if (error !== null) {
                return handleError(error.message);
            }
        }
    }
    const handleError = (message) => {
        return <ErrorMessage message={message}/>;
    }
    const handleChange2 = (field, value) => {
        setFormValues((prevState) => ({
            ...prevState, [field]: value,
        }));
    };

    useEffect(() => {
        // dropDownData = DropDownData()
        setFormValues(rowData);
    }, [rowData]);

    // reduce number of renders when formValues is empty
    if (Object.keys(formValues).length === 0) {
        return <div>Loading...</div>
    }
    const UpdateData = ({rowData, error, formValues}) => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);

        const configObj = {
            axiosInstance: instance,
            ...methods.update,
            requestConfig: {
                data: formValues
            }
        }

        axiosApi(configObj)
            .then(response => {
                rowData = response.data
                console.log("Update: ", rowData)
            })
            .catch(err => {
                window.alert(error.message)
                console.log("Error: " + error.message)
                handleClose()
            })
        // refresh grid
        refreshPage()
    }
    const AddData = ({data, loading, error, formValues}) => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);

        const configObj = {
            axiosInstance: instance,
            ...methods.add,
            requestConfig: {
                data: {...formValues}
            }
        }
        // console.log('Before axiosApi call-Data:'+ data);

        axiosApi(configObj)
            .then(response => {
                handleClose()
                rowData = response.data
                console.log("Add: ", response.data)
                setRowData(response.data)
            })
            .catch(err => {
                console.log("Error: " + error.message)
                handleClose()
            })
        // refresh grid
        // refreshPage()
    }

    const CancelButton = () => {
        return (
            <Button onClick={() => handleClose()}
                    color="secondary"
                    variant="outlined"
            > Cancel </Button>
        )
    }
    const SubmitButton = ({formValues, setOpen, error}) => {
        return (
            <Button onClick={() => handleFormSubmit({formValues, setOpen, error})}
                    type="submit"
                    color="primary"
                    variant="outlined"
            >Submit</Button>
        )
    }
    const dropDown = {
        width: '60%',
        height: '50%',
        overflowY: 'auto',
    }

    const options = [
        2022,
        2023,
        2024,
    ]
    return (
        <Dialog
            className="scroll"
            open={open}
            onClose={() => onClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"> {formValues.id ? messages.update : messages.create}</DialogTitle>
            <DialogContent>
                    {colDefs.map(prop => {
                        let options
                        const commonProps = {
                            style: dropDown,
                            // formValues: {...props.data},
                            formValues: rowData,
                            value: formValues ? formValues[prop.field] : "",
                            // setFormValues: setData,
                            field: prop.field,
                            onChange: handleChange2,
                            key: prop.field,
                            // defaultValue: colDefs[prop.field],
                            // onSubmit: handleSubmit,
                        }
                        switch (prop.field) {
                            case "playerName" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Player Name"}
                                    options={dropDownData.players}/>
                            case "statname" :
                                return
                            case "awayTeamName" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Away Team Name"}
                                    options={dropDownData.clubs}/>
                            case "homeTeamName" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Home Team Name"}
                                    options={dropDownData.clubs}/>
                            case "pitchgrid":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Pitchgrid"}
                                    options={dropDownData.pitchgrids}/>
                            case "round":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Round"}
                                    options={dropDownData.rounds}/>
                            case "season":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Season"}
                                    options={getSeasons()}/>
                            case "position":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Position"}
                                    options={dropDownData.positions}/>
                            case "positionNumber":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Position Number"}
                                    options={dropDownData.positionNumbers}/>
                            case "competitionName":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Competition Name"}
                                    options={dropDownData.competitions}/>
                            case "success":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Success"}
                                    options={SUCCESS}/>
                            case "statName":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Statnames"}
                                    options={dropDownData.statnames}/>
                            case "registered":
                                let component =
                                    <DropDown
                                        {...commonProps}
                                        headerName={"Registered"}
                                        options={REGISTERED}/>
                                console.log(component)
                                return component
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
                            case "half" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"First/Second Half"}
                                    options={HALF}/>
                            case "season":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Season"}
                                    options={getSeasons()}/>
                            case 'fixtureDate':
                                return <MyDatePicker
                                    {...commonProps}
                                    headerName={"Date"}/>
                            case 'fixtureTime':
                                return <MyTimePicker
                                    {...commonProps}
                                    headerName={"Time"}/>
                            default:
                                return <MyTextField
                                    {...commonProps}
                                    className="myTextField"
                                    headerName={prop.headerName}
                                />
                        }
                    })
                    }

                </DialogContent>
                <DialogActions>
                    <CancelButton
                        // setOpen={setOpen}
                        // initialValue={initialValue}
                        // setFormValues={setFormValues}
                    />
                    <SubmitButton
                        setRowData={setRowData}
                        axiosApi={axiosApi}
                        rowData={rowData}

                        formValues={formValues}
                        methods={methods}
                        setOpen={setOpen}
                        error={error}/>
                </DialogActions>
            </Dialog>
    );
}
export default FormDialog4;
