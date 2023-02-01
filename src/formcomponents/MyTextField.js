import {TextField} from "@mui/material";
import React from "react";

const MyTextField = ({params, index, field, formData, onChange, headerName, style}) => {

    // let defaultValue = (params.formData[params.field]) ? (params.formData[params.field]) : ""
    let defaultValue = (formData[field]) ? (formData[field]) : ""

    return (
        <TextField
            style={style}
            key={index}
            // id={field}
            // valuedefault={defaultValue}
            value={formData[field]?formData[field]:""}
            onChange={e => onChange(e)}
            data={formData}
            placeholder={"Enter " + headerName}
            label={headerName}
            variant="outlined"
            margin="dense"
            fullWidth
        />
    )
}
export default MyTextField;