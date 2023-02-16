import {TextField} from "@mui/material";
import React, {useState} from "react";
import {getUniqueId} from "../common/helper";

const MyTextField = ({index, field, formData, setFormData, onChange, headerName, style}) => {

    // let defaultValue = (params.formData[params.field]) ? (params.formData[params.field]) : ""
    // let defaultValue = (formData[field]) ? (formData[field]) : ""

    const onSelectChange = (e) => {
        const {id, value} = e.target
        setFormData((prevState) => ({  ...prevState, [id]: value }))
    }

    console.log("Field:  " + field)
    console.log("textField-FormData: " + {...formData})
    console.log("textField-FormData[field]: " + formData[field])
    return (
        <TextField
            // style={style}
            // key={getUniqueId()}
            // id={field}
            // valuedefault={formData}
            value={formData[field]} //{formData[field] ? formData[field] : ""}
            onChange={e => onChange(e)}
            data={formData}
            // placeholder={"Enter " + headerName}
            // label={headerName}
            // variant="outlined"
            // margin="dense"
            fullWidth
        />
    )
}
export default MyTextField;