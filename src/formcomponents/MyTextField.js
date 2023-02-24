import {TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {getUniqueId} from "../common/helper";
import './textfield.css'


const MyTextField = ({onChange, headerName, value, field, className}) => {
    const [dataValue, setDataValue] = useState(value)
    const inputRef = useRef(null);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setDataValue(newValue);
        onChange(field, newValue);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [value]);

    const textFieldParams = {

        placeholder: "Enter " + headerName,
        field: field,
        style: {margin: 10},
        label: headerName,
        value: value ? value : undefined,
        onChange: handleChange,
        // onBlur: e => onChange(e, field),
        variant: "outlined",
        inputRef: inputRef,
    }

    return (
        <TextField
            {...textFieldParams}
            className={className}
            variant="filled"
            fullWidth
        />
    )
}
export default MyTextField;