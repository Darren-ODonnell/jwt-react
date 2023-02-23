import {TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {getUniqueId} from "../common/helper";


const MyTextField = ({onChange, headerName, value, field}) => {
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
        label: headerName,
        value: value ? value : undefined,
        onChange: handleChange,
        // onBlur: e => onChange(e, field),
        variant: "outlined",
        inputRef: inputRef,
    }

    return (<TextField  {...textFieldParams} fullWidth/>)
}
export default MyTextField;