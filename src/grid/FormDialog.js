import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import './FormDialog.css'
import '../formcomponents/textfield.css'

import MyTextField from "../formcomponents/MyTextField";
import { getSeasons, handleClickAway, refreshPage } from "../common/helper";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import {ErrorMessage} from "../common/ErrorMessage";
import MyTimePicker from "../formcomponents/MyTimePicker";
import MyDatePicker from "../formcomponents/MyDatePicker";
import DropDown from "../formcomponents/DropDown";
import {AVAILABILITY, GRADES, HALF, REGISTERED, SUCCESS} from "../common/globals";
import DropDownData from "../common/DropDownData";

const FormDialog = ({
                        open, onClose, messages, rowData, colDefs, handleClose,
                        error, setOpen, methods, setRowData, axiosApi, entity
                    }) => {
    const [formValues, setFormValues] = useState([])

    let dropDownData = DropDownData()

    const handleFormSubmit = ({formValues, error}) => {

        const request = {...methods.add, data: formValues};

        if (formValues.id) {
            setOpen(false);
            const request = methods.update;
            UpdateData({methods, axiosApi, rowData, error, formValues, request})

        } else {
            setOpen(false);
            AddData({methods, axiosApi, rowData, error, formValues, setOpen, setRowData, request}).then(res => {
                if (res) setRowData(res);
                if (error !== null) {
                    return handleError(error.message);
                }
            });
        }
    };

    const handleChange2 = (field, value) => {
        setFormValues((prevState) => ({
            ...prevState, [field]: value,
        }));
    };

    const handleError = (message) => {
        return <ErrorMessage message={message}/>;
    }

    useEffect(() => {
        setFormValues(rowData);
    }, [rowData]);

    // reduce number of renders when formValues is empty
    if (Object.keys(formValues).length === 0) {
        return <div>Loading...</div>
    }

    const UpdateData = ({formValues}) => {
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
           .then(() => {

           })
            .catch(err => {
                window.alert(err.message)
                handleClose()
            })
        // refresh grid
        refreshPage()
    }


    const AddData = ({formValues}) => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);

        const configObj = {
            axiosInstance: instance,
            ...methods.add,
            requestConfig: {
                data: formValues,
            }
        }


        axiosApi(configObj)
           .then(response => {
               handleClose()
               setRowData(response.data)
           })
           .catch(() => {
               handleClose()
           })
        // refresh grid
        refreshPage()
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

    return (
        <Dialog
            className="scroll"
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={handleClickAway}
        >
            <DialogTitle id="alert-dialog-title"> {formValues.id ? messages.update : messages.create}</DialogTitle>
            <DialogContent>
                    {colDefs.map(prop => {
                        const commonProps = {
                            style: dropDown,
                            formValues: rowData,
                            value: formValues ? formValues[prop.field] : "",
                            field: prop.field,
                            onChange: handleChange2,
                            key: prop.field,
                            onUpdate: (value) => handleChange2(prop.field, value),
                        }
                        let myValue
                        switch (prop.field) {
                            case "playerName" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Player Name"}
                                    defaultValue={"Corcoran, Laura"}
                                    options={dropDownData.players}/>
                            case "awayTeamName" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Away Team Name"}
                                    defaultValue={"St Judes"}
                                    options={dropDownData.clubs}/>
                            case "homeTeamName" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Home Team Name"}
                                    defaultValue={"St Judes"}
                                    options={dropDownData.clubs}/>
                            case "pitchgrid":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Pitch-Grid"}
                                    defaultValue={dropDownData.pitchgrids[0]}
                                    options={dropDownData.pitchgrids}/>
                            case "round":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Round"}
                                    defaultValue={dropDownData.rounds[0]}
                                    options={dropDownData.rounds}/>
                            case "season":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Season"}
                                    defaultValue={new Date().getFullYear()}
                                    options={getSeasons()}/>
                            case "position":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Position"}
                                    defaultValue={"Select Position Name"}
                                    options={dropDownData.positions}/>
                            case "positionNumber":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Position Number"}
                                    defaultValue={"Select Position Number"}
                                    options={dropDownData.positionNumbers}/>
                            case "competitionName":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Competition Name"}
                                    defaultValue={dropDownData.competitions[0]}
                                    options={[...new Set(dropDownData.competitions)]}/>
                            case "success":
                                myValue = formValues[prop.field] ? "True" : "False"
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Success"}
                                    defaultValue={myValue}
                                    value={myValue}
                                    options={SUCCESS}/>
                            case "registered":
                                myValue = formValues[prop.field] ? "True" : "False"
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Registered"}
                                    defaultValue={myValue}
                                    value={myValue}
                                    options={REGISTERED}/>

                            case "grade":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Grade"}
                                    defaultValue={GRADES[0]}
                                    options={GRADES}/>
                            case "statName":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Stat names"}
                                    defaultValue={"Select Stat Name"}
                                    options={dropDownData.statnames}/>
                            case "availability":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Availability"}
                                    defaultValue={AVAILABILITY[0]}
                                    options={AVAILABILITY}/>
                            case "half" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"First/Second Half"}

                                    defaultValue={HALF[0]}
                                    options={HALF}/>
                            case 'fixtureDate':
                                return <MyDatePicker
                                    {...commonProps}
                                    headerName={"Date"}/>
                            case 'fixtureTime':
                                return <MyTimePicker
                                    {...commonProps}
                                    defaultValue={new Date().getTime()}
                                    headerName={"Time"}/>
                            default:
                                return <MyTextField
                                    {...commonProps}
                                    value={formValues ? formValues[prop.field] : " "}
                                    className="myTextField"
                                    headerName={prop.headerName}
                                />
                        }
                    })
                    }
                </DialogContent>
                <DialogActions>
                    <CancelButton/>
                    <SubmitButton
                       setRowData={setRowData}
                       axiosApi={axiosApi}
                       rowData={rowData}
                       entity={entity}

                       formValues={formValues}
                       methods={methods}
                       setOpen={setOpen}
                       error={error}/>
                </DialogActions>
            </Dialog>
    );
}
export default FormDialog;
