import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import './FormDialog.css'
import '../formcomponents/textfield.css'

import MyTextField from "../formcomponents/MyTextField";
import {refreshPage} from "../common/helper";
import AuthService from "../auth/AuthService";
import instance from "../api/axios";
import {ErrorMessage} from "../common/ErrorMessage";

const FormDialog4 = ({
                         open, onClose, messages, onSubmit, rowData, setData, colDefs, handleClose, handleSubmit,
                         initialValue, error, setOpen, methods, loading, axiosApi, setRowData
                     }) => {
    const [formValues, setFormValues] = useState({initialValue})

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
                error = err.message;
            })
        // refresh grid
        refreshPage()
    }
    const AddData = ({error, formValues}) => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);

        const configObj = {
            axiosInstance: instance,
            ...methods.add,
            requestConfig: {
                data: {...formValues}
            }
        }

        axiosApi(configObj)
            .then(response => {
                handleClose()
                rowData = response.data
                console.log("Add: ", response.data)
                setRowData(response.data)
            })
            .catch(err => {
                error = err.message;
                console.log("Error Message from Endpoint: " + err.message)
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
                        switch (prop.field) {
                            default:
                                return <MyTextField
                                    key={prop.field}
                                    className="myTextField"
                                    headerName={prop.headerName}
                                    value={formValues ? formValues[prop.field] : ""}
                                    onChange={handleChange2}
                                    field={prop.field}
                                />
                        }
                    })}

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
