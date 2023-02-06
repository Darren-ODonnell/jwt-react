import {TextField} from "@mui/material";
import React from "react";
import {getUniqueId} from "../common/helper";

const MyTextField = ({index, field, formData, setFormData, onChange, headerName, style}) => {

    // let defaultValue = (params.formData[params.field]) ? (params.formData[params.field]) : ""
    // let defaultValue = (formData[field]) ? (formData[field]) : ""

    const onSelectChange = (e) => {
        const {id, value} = e.target
        setFormData({...formData, [id]: value})
    }

    console.log("textFiled-FormData: " + formData)
    return (
        <TextField
            // style={style}
            key={getUniqueId()}
            id={field}
            // valuedefault={defaultValue}
            value={formData[field]} //{formData[field] ? formData[field] : ""}
            onChange={e => onSelectChange(e)}
            data={formData[field]}
            placeholder={"Enter " + headerName}
            label={headerName}
            variant="outlined"
            margin="dense"
            fullWidth
        />
    )
}
export default MyTextField;