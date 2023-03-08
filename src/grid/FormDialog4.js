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

import {AVAILABILITY, GRADES, HALF, REGISTERED, SUCCESS} from "../common/globals";
import DropDownData from "../formcomponents/DropDownData";
import {AddData, UpdateData} from "../api/ApiService";
const FormDialog4 = ({
                         open, onClose, messages, rowData, colDefs, handleClose,
                         initialValue, error, setOpen, methods, setRowData, axiosApi, entity, validate, location
                     }) => {
    const [formValues, setFormValues] = useState({initialValue})

    let dropDownData = DropDownData()

    const handleFormSubmit = ({formValues, error}) => {
        let valid =  validate(formValues);

        console.log("FormValues: ", formValues);

        const request = {...methods.add, data: formValues};
        if (valid) {
            if (formValues.id) {
                setOpen(false);
                const request = methods.update;
                UpdateData({methods, axiosApi, rowData, error, formValues, request})
                    .then(res => {
                    if (res) setRowData(res);
                    if (error !== null) {
                        return handleError(error.message);
                    }
                });
            } else {
                setOpen(false);
                AddData({methods, axiosApi, rowData, error, formValues, setOpen, setRowData, request}).then(res => {
                    if (res) setRowData(res);
                    if (error !== null) {
                        return handleError(error.message);
                    }
                });
            }
        }
        refreshPage()
    };

    // const handleFormSubmit = ({formValues, error}) => {
    //     setValid(validate(formValues))
    //
    //
    //     console.log('FormValues: ', formValues)
    //     const request = {...methods.add, data: formValues};
    //     if (valid) {
    //         if (formValues.id) {// updating a record
    //             // const confirm = window.confirm("Are you sure, you want to update this row ?")
    //             // confirm && actions.update(formData.id, formData)
    //             setOpen(false)
    //             const request = methods.update;
    //             UpdateData({methods, axiosApi, rowData, error, formValues, request});
    //             if (error !== null) {
    //                 return handleError(error.message);
    //             }
    //
    //         } else { // adding new record
    //             setOpen(false)
    //             AddData({methods, axiosApi, rowData, error, formValues, setOpen, setRowData, request});
    //             if (error !== null) {
    //                 return handleError(error.message);
    //             }
    //         }
    //     }
    // }
    const handleChange2 = (field, value) => {
        setFormValues((prevState) => ({
            ...prevState, [field]: value,
        }));
    };


    const handleError = (message) => {
        return <ErrorMessage message={message}/>;
    }


    useEffect(() => {
        // dropDownData = DropDownData()
        setFormValues(rowData);
    }, [rowData]);

    // reduce number of renders when formValues is empty
    if (Object.keys(formValues).length === 0) {
        return <div>Loading...</div>
    }
    // const UpdateData = ({rowData, error, formValues}) => {
    //     const user = AuthService.getCurrentUser();
    //     AuthService.setAuthToken(user.accessToken);
    //
    //     const configObj = {
    //         axiosInstance: instance,
    //         ...methods.update,
    //         requestConfig: {
    //             data: formValues
    //         }
    //     }
    //
    //     axiosApi(configObj)
    //         .then(response => {
    //             rowData = response.data
    //             console.log("Update: ", rowData)
    //         })
    //         .catch(err => {
    //             window.alert(error.message)
    //             console.log("Error: " + error.message)
    //             handleClose()
    //         })
    //     // refresh grid
    //     refreshPage()
    // }
    // const AddData = ({data, loading, error, formValues}) => {
    //     const user = AuthService.getCurrentUser();
    //     AuthService.setAuthToken(user.accessToken);
    //
    //     const configObj = {
    //         axiosInstance: instance,
    //         ...methods.add,
    //         requestConfig: {
    //             data: {...formValues}
    //         }
    //     }
    //     // console.log('Before axiosApi call-Data:'+ data);
    //
    //     axiosApi(configObj)
    //         .then(response => {
    //             handleClose()
    //             rowData = response.data
    //             console.log("Add: ", response.data)
    //             setRowData(response.data)
    //         })
    //         .catch(err => {
    //             console.log("Error: " + error.message)
    //             handleClose()
    //         })
    // refresh grid
    // refreshPage()
    // }

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
            onClose={() => onClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
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
                        switch (prop.field) {
                            case "playerName" :
                                return <DropDown
                                    {...commonProps}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    headerName={"Player Name"}
                                    defaultValue={"Corcoran, Laura"}
                                    options={dropDownData.players}/>
                            case "awayTeamName" :
                                return <DropDown
                                    {...commonProps}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    headerName={"Away Team Name"}
                                    defaultValue={"St Judes"}
                                    options={dropDownData.clubs}/>
                            case "homeTeamName" :
                                return <DropDown
                                    {...commonProps}
                                    // value={formValues ? formValues[prop.field] : ""}
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
                                    // value={formValues ? formValues[prop.field] : ""}
                                    headerName={"Round"}
                                    defaultValue={dropDownData.rounds[0]}
                                    options={dropDownData.rounds}/>
                            case "season":
                                return <DropDown
                                    {...commonProps}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    headerName={"Season"}
                                    defaultValue={new Date().getFullYear()}
                                    options={getSeasons()}/>
                            case "position":
                                return <DropDown
                                    {...commonProps}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    headerName={"Position"}
                                    defaultValue={"Select Position Name"}
                                    options={dropDownData.positions}/>
                            case "positionNumber":
                                return <DropDown
                                    {...commonProps}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    headerName={"Position Number"}
                                    defaultValue={"Select Position Number"}
                                    options={dropDownData.positionNumbers}/>
                            case "competitionName":
                                return <DropDown
                                    {...commonProps}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    headerName={"Competition Name"}
                                    defaultValue={dropDownData.competitions[0]}
                                    options={[...new Set(dropDownData.competitions)]}/>
                            case "success":
                                let myValue = formValues[prop.field] ? "True" : "False"
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Success"}
                                    defaultValue={"True"}
                                    value={myValue}
                                    options={SUCCESS}/>
                            case "statName":
                                return <DropDown
                                    {...commonProps}

                                    headerName={"Stat names"}
                                    defaultValue={"Select Stat Name"}
                                    options={dropDownData.statnames}/>
                            case "registered":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Registered"}
                                    defaultValue={"True"}
                                    value={formValues[prop.field] === true ? "True" : "False"}
                                    options={REGISTERED}/>
                            case "grade":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Grade"}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    defaultValue={GRADES[0]}
                                    options={GRADES}/>
                            case "availability":
                                return <DropDown
                                    {...commonProps}
                                    headerName={"Availability"}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    defaultValue={AVAILABILITY[0]}
                                    options={AVAILABILITY}/>
                            case "half" :
                                return <DropDown
                                    {...commonProps}
                                    headerName={"First/Second Half"}
                                    // value={formValues ? formValues[prop.field] : ""}
                                    defaultValue={HALF[0]}
                                    options={HALF}/>
                            case 'fixtureDate':
                                return <MyDatePicker
                                    {...commonProps}
                                    headerName={"Date"}/>
                            case 'fixtureTime':
                                return <MyTimePicker
                                    {...commonProps}
                                    // value={formValues ? formValues[prop.field] : ""}
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
                    <CancelButton
                        // setOpen={setOpen}
                        // initialValue={initialValue}
                        // setFormValues={setFormValues}
                    />
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
export default FormDialog4;
