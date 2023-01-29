import {TextField} from "@mui/material";
import React from "react";

const MyTextField = ({index, field, formData, onChange, headerName}) => {
    // console.log("default - textField")
    return (
        <TextField
            key={index}
            id={field}
            value={formData[field]}
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