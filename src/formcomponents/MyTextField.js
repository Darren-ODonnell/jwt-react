import {TextField} from "@mui/material";
import React from "react";
import {getUniqueId} from "../common/helper";

const MyTextField = ({index, field, formData, setFormData, onChange, headerName, style}) => {

    // let defaultValue = (params.formData[params.field]) ? (params.formData[params.field]) : ""
    let defaultValue = (formData[field]) ? (formData[field]) : ""

    const onSelectChange = (e, field) => {
        setFormData( ...formData , [field] = e.target.value)
    }
    // console.log('formData: ', formData)
    // console.log('defaultValue: ', defaultValue)
    // console.log('value: ', formData[field] ? formData[field] : "")
    return (
        <TextField
            style={style}
            key={getUniqueId()}
            id={field}
            valuedefault={defaultValue}
            value={formData[field] ? formData[field] : ""}
            onChange={e => onSelectChange(e, field)}
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