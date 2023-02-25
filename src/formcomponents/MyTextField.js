import {TextField} from "@mui/material";
import React from "react";
import './textfield.css'


const MyTextField = ({onChange, headerName, value, field, className}) => {

    const handleChange = (event) => {
        const value = event.target.value;
        onChange(field, value);

    };

    const textFieldParams = {

        placeholder: "Enter " + headerName,
        field: field,
        style: {margin: 10},
        label: headerName,
        value: value ? value : undefined,
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