import {TextField} from "@mui/material";
import React, { useEffect, useState } from "react";
import {getUniqueId} from "../common/helper";

const MyTextField = ({index, field, formValues, setFormValues, onChange, headerName, style, value}) => {

    // let defaultValue = (params.formData[params.field]) ? (params.formData[params.field]) : ""
    // let defaultValue = (formData[field]) ? (formData[field]) : ""

    const onSelectChange = (e) => {
        const {id, value} = e.target
        setFormValues((prevState) => ({...prevState, [id]: value}))
    }

    // console.log("textField-FormValues-field: " + formValues[field])
    console.log("Field:  " + field)
    console.log("textField-FormValues: " + {...formValues})

    console.log("FormValues: " + formValues)
    const textFieldParams = {
        // value: value,

        onChange    : e => onChange(e),
        data: formValues,
        placeholder : "Enter " + headerName,
        label       : headerName,
        variant     : "outlined",
        margin      : "dense",
        key         : getUniqueId(),
        id          : field,
        valuedefault: formValues,
    }

    useEffect(() => {

    },[formValues])


    return (
        <TextField
            {...textFieldParams}

            // style : style}
            // key : getUniqueId()}
            // id : field}
            // valuedefault : formData}
            fullWidth
        />
    )
}
export default MyTextField;