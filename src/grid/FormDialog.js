import React, { useEffect, useState } from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

import {ErrorMessage} from "../common/ErrorMessage";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import './FormDialog.css'

import {
    refreshPage, getUniqueId,
} from "../common/helper";

import moment from "moment";
import {
    DATE_FORMAT, ROUNDS, GRADES, SUCCESS,
    TIME_FORMAT, TIME_FORMAT_SAVE, HALF, POSITIONS,
    PLAYER_NUMBERS, REGISTERED, AVAILABILITY, PITCH_GRIDS,
    COMPETITIONS
} from "../common/globals";
import MyTextField from "../formcomponents/MyTextField";
import DropDown from "../formcomponents/DropDown";
import MyTimePicker from "../formcomponents/MyTimePicker";
import MyDatePicker from "../formcomponents/MyDatePicker";

const FormDialog = ({ open, onClose, onSubmit, rowData, setData, colDefs, handleClose, handleSubmit,initialValue, error, setOpen, methods, loading }) => {
    const [formValues, setFormValues] = useState(initialValue)
    // const [value, setValue] = useState()
    // const [dateValue, setDateValue] = useState(props.rowData.fixtureDate)
    // const [timeValue, setTimeValue] = useState(moment(props.data.fixtureTime, TIME_FORMAT))
    // const [selected , setSelected]  = useState( rowData )
    // const [formData, setFormData] = useState({...props.data})

    console.log("Open: "+open)
    console.log("RowData: "+{...rowData})
    console.log("formValues: "+{...formValues})


    const handleChange2 = (event) => {
        // const {name, value} = event.target;
        // setFormValues({...formValues, [name]: value});
    };


    const handleError = (message) => {
        return <ErrorMessage message={message}/>;

    }
    const handleFormSubmit = ({formValues, methods, setOpen, error}) => {
        // console.log('FormValues: ', formValues)
        // const request = {...methods.add, data: formValues};
        //
        // if (formValues.id)  {// updating a record
        //     // const confirm = window.confirm("Are you sure, you want to update this row ?")
        //     // confirm && actions.update(formData.id, formData)
        //     setOpen(false)
        //     const request = methods.update;
        //     UpdateData( {...props, request});
        //     if (error !== null) {   return handleError(error.message); }
        //
        // } else { // adding new record
        //     setOpen(false)
        //     AddData( {...props, request});
        //     if (error !== null) {   return handleError(error.message); }
        // }
    }
    // form elements
    const onCancel = ({setOpen, initialValue, setFormValues}) => {
        // props.onClose(setOpen)
        // setFormValues(initialValue);
        // setOpen(false)
    }
    const CancelButton = () => {
        return (

            <Button onClick={ () => handleClose() }
                    color   = "secondary"
                    variant = "outlined"
            > Cancel </Button>
        )
    }
    const SubmitButton = ({formValues, methods, setOpen, error}) => {
        return (
            <>
                <Button onClick={() => handleFormSubmit({formValues, methods, setOpen, error})}
                        type="submit"
                        color="primary"
                        variant="outlined"
                >Submit</Button>
            </>
        )
    }

    // function onChange(e) {
    //     const {id, value} = e.target
    //     console.log("Id: "+id + "value: "+value)
    //     // props.setFormValues({...props.formValues, [id]: value})
    //     props.setFormValues((prevState) => ({  ...prevState, [id]: value }))
    //
    //     // setValue(e.target.value);
    // }
    // const handleChange = (e) => {
    //     const {id, value} = e.target
    //
    //     props.setFormValues((prevFormValues) => ({
    //         ...prevFormValues,
    //         [id]: value,
    //     }));
    //     console.log("ID: "+id+" Value: " + value)
    // };


    const AddData = ({methods, axiosApi, data, error, formData, setOpen, setData}) => {
        // const user = AuthService.getCurrentUser();
        // AuthService.setAuthToken(user.accessToken);
        //
        // const configObj = {
        //     axiosInstance: instance,
        //     ...methods.add,
        //     requestConfig: {
        //         data: {...formData}
        //     }
        // }
        //
        //
        // axiosApi( configObj )
        //     .then( response => {
        //         setOpen( false )
        //         data = response.data
        //         console.log("Add: ", response.data)
        //         setData(data)
        //     })
        //     .catch(err => {
        //         error = err.message;
        //         setOpen(false)
        //
        //     })
        // // refresh grid
        // refreshPage()
        // // window.location.reload()
    }
    const UpdateData = ({methods, axiosApi, data, error, formData}) => {
        //
        // const user = AuthService.getCurrentUser();
        // AuthService.setAuthToken(user.accessToken);
        //
        // const configObj = {
        //     axiosInstance: instance,
        //     ...methods.update,
        //     requestConfig: {
        //         data: formData
        //     }
        // }
        //
        // axiosApi(configObj)
        //     .then(response => {
        //         data = response.data
        //         console.log("Update: ", data)
        //     })
        //     .catch(err => {
        //         error = err.message;
        //     })
        // // refresh grid
        // refreshPage()
        // // window.location.reload()
    }
    useEffect(() => {
        setFormValues(rowData);
    }, [rowData]);

    const scroll = {
        overflowX: 'scroll',
        overflowY: 'scroll',
    }

    const dropDown = {
        width: '60%',
        height: '50%',
        overflowY: 'auto',

    }
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     props.onSubmit(formValues);
    // };

    const handleDialogEnter = () => {
        console.log("Inside Dialog")
    }

    return (

         <div>

            <Dialog

                className="scroll"
                style={scroll}
                id={getUniqueId()}
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent dividers>
                    {

                        colDefs.map(prop => {
                            let options
                            const commonProps = {
                                // style: dropDown,
                                // formData: {...props.data},
                                // formValues: rowData,
                                // value: formValues[prop.field],
                                // setFormValues: setData,
                                // field: prop.field,
                                // onChange: handleChange2,
                                // key: getUniqueId(),
                                // defaultValue: colDefs[prop.field],
                                // onSubmit: handleSubmit,
                            }

                            switch ( prop.field ) {

                                default:
                                    return <MyTextField
                                        className="myTextField"
                                        headerName={prop.headerName}
                                        formValues={formValues}
                                        // value={ formValues[ prop.field ] }
                                        setFormValues={setData}
                                        field={prop.field}
                                        onChange={handleChange2}
                                        key={prop.field}
                                        onSubmit={handleSubmit}

                                    />
                            }
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <CancelButton setOpen={setOpen} setFormValues={setFormValues} initialValue={initialValue}/>
                    <SubmitButton setOpen={setOpen} formValue={formValues} methods={methods} error={error}/>
                </DialogActions>
            </Dialog>
        </div>



    );
}
export default FormDialog;

// {/*<DialogTitle id="alert-dialog-title">*/}
// {/*    {props.rowData.id ? props.messages.update : props.messages.create}*/}
// {/*</DialogTitle>*/}
//
// {/*className="dropDown"*/}

// case "awayTeamName" :
// case "homeTeamName" :
//     return clubDropdown({...props, ...prop, index});
// // case "playerName" :
// //     return playerNameDropDown()
// // case "statname" :
// //     return
// case "half" :
//     return <DropDown
//         {...commonProps}
//         headerName={"First/Second Half"}
//         options={HALF} />
// case "registered":
//     let component =
//         <DropDown
//             {...commonProps}
//             headerName={"Registered"}
//             options={REGISTERED} />
//     console.log(component)
//     return component
// case "grade":
//     return <DropDown
//         {...commonProps}
//         headerName={"Grade"}
//         options={GRADES} />
// case "availability":
//     return <DropDown
//         {...commonProps}
//         headerName={"Availability"}
//         options={AVAILABILITY} />
// case "pitchgrid":
//     return <DropDown
//         {...commonProps}
//         headerName={"Pitchgrid"}
//         options={PITCH_GRIDS} />
// case "success":
//     return <DropDown
//         {...commonProps}
//         headerName={"Success"}
//         options={SUCCESS} />
// case "position":
//     return <DropDown
//         {...commonProps}
//         headerName={"Position"}
//         options={POSITIONS} />
// case "positionNumber":
//     return <DropDown
//         {...commonProps}
//         headerName={"Position Number"}
//         options={PLAYER_NUMBERS} />
// case "competitionName":
//     return <DropDown
//         {...commonProps}
//         headerName={"Competition Name"}
//         options={COMPETITIONS} />
//
// case "round":
//     return <DropDown
//         {...commonProps}
//         headerName={"Round"}
//         options={ROUNDS} />
// case "season":
//     return <DropDown
//         {...commonProps}
//         headerName={"Season"}
//         options={getSeasons()} />
// case 'fixtureDate':
//     return <MyDatePicker
//         {...commonProps}
//         headerName={"Date"}/>
// case 'fixtureTime':
//     return <MyTimePicker
//         {...commonProps}
//         headerName={"Time"}/>