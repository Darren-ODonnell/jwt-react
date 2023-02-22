import {TextField} from "@mui/material";
import React, { useEffect, useState } from "react";
import {getUniqueId} from "../common/helper";

const MyTextField = ({index, field, formValues, setFormValues, onChange, headerName, style, value}) => {


    // const onSelectChange = (e) => {
    //     const {id, value} = e.target
    //     setFormValues((prevState) => ({...prevState, [id]: value}))
    // }


    const textFieldParams = {
        onChange    : e => onChange(e),
        value        : value,
        placeholder : "Enter " + headerName,
        label       : headerName,
        variant     : "outlined",
        margin      : "dense",
        key         : getUniqueId(),
        id          : field,

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