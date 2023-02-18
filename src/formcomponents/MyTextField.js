import {TextField} from "@mui/material";
import React, {useState} from "react";
import {getUniqueId} from "../common/helper";

const MyTextField = ({index, field, formData, setFormData, onChange, headerName, style, value}) => {

    // let defaultValue = (params.formData[params.field]) ? (params.formData[params.field]) : ""
    // let defaultValue = (formData[field]) ? (formData[field]) : ""

    const onSelectChange = (e) => {
        const {id, value} = e.target
        setFormData((prevState) => ({...prevState, [id]: value}))
    }

    console.log("textField-FormData-field: " + formData[field])
    console.log("Field:  " + field)
    console.log("textField-FormData: " + {...formData})

    const textFieldParams = {
        value: value,
        // value: formData[field],       //{formData[field] ? formData[field] : "",
        onChange: e => onChange(e),
        data: formData,
        placeholder: "Enter " + headerName,
        label: headerName,
        variant: "outlined",
        margin: "dense",

    }

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