import React, {useEffect} from 'react';
import {MenuItem, Select, FormControl, TextField, InputLabel} from "@mui/material";
import {getUniqueId, handleBooleanValues} from "../common/helper";
import {useState} from "react";
import './dropdown.css'

const DropDown = ({formValues, field, headerName, options, value, required, onUpdate}) => {
    const [data, setData] = useState(formValues[field])

    let defaultValue = (formValues[field]) ? (formValues[field]) : ""

    const onSelectChange = (e, field) => {
        let value = handleBooleanValues(e.target.value)
        setData(value)
        onUpdate(value)

    }
    useEffect(() => {
        setData(formValues[field])
    }, [formValues])

    console.log("Field-Dropdown: " + field + " - Value: " + formValues[field])
    return (options ?
            <FormControl>
                <InputLabel className="label" htmlFor="my-select">{headerName}</InputLabel>
                <Select className="select"
                        key={field}
                        id="demo-simple-select"
                        placeholder={"Enter " + headerName}
                        value={data}
                        required={required}
                        variant={"outlined"}
                        onChange={e => onSelectChange(e, field)}
                        inputProps={{id: 'my-select'}}
                        label={headerName}
                >
                    {options.map((entry) =>
                        <MenuItem className="my-menu-item label"
                                  key={entry}
                                  variant={"outlined"}
                                  value={entry}
                        > {entry} </MenuItem>
                    )}

                </Select>
            </FormControl>
            :
            <div>Loading...</div>
    )
}

export default DropDown;

