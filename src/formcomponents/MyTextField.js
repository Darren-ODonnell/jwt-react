import {TextField} from "@mui/material";
import React from "react";
import './textfield.css'
import {handleBooleanValues} from "../common/helper";

const MyTextField = ({onChange, headerName, value, field, className, defaultValue}) => {

    const handleChange = (event) => {
        let value = handleBooleanValues(event.target.value)
        onChange(field, value);
    };

    const textFieldParams = {
        placeholder: "Enter " + headerName,
        field: field,
        style: {margin: 8, backgroundColor: "#F2F2F2"},
        label: headerName,
        value: value ? value : defaultValue,
        onChange: handleChange,
        variant: "outlined",
        defaultValue: defaultValue,
    }

    return (
        <TextField
            {...textFieldParams}
            className={className}
        />
    )
}
export default MyTextField;