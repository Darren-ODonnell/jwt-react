import {TextField} from "@mui/material";
import React from "react";
import './textfield.css'


const MyTextField = ({onChange, headerName, value, field, className}) => {

    const handleChange = (event) => {
        onChange(field, event.target.value);
    };

    const textFieldParams = {
        placeholder: "Enter " + headerName,
        field: field,
        style: {margin: 8},
        label: headerName,
        value: value ? value : "",
        onChange: handleChange,
        variant: "outlined",
    }

    return (
        <TextField
            {...textFieldParams}
            className={className}
            variant="filled"
            // fullWidth
        />
    )
}
export default MyTextField;