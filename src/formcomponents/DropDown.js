import React, {useEffect} from 'react';
import {MenuItem, Select, FormControl, TextField, InputLabel} from "@mui/material";
import {getUniqueId} from "../common/helper";
import {useState} from "react";
import './dropdown.css'

const DropDown = ({formValues, field, headerName, options, options2}) => {
    const [data, setData] = useState(formValues[field])

    let defaultValue = (formValues[field]) ? (formValues[field]) : ""

    const onSelectChange = (e, field) => {
        setData(e.target.value)
    }
    useEffect(() => {
        setData(formValues[field])
    }, [formValues])

    console.log("options: " + options + " HeaderName: " + headerName)

    return (options ?
            <FormControl>
                <InputLabel className="label" htmlFor="my-select">{headerName}</InputLabel>
                <Select className="select"
                        key={field}
                        id="demo-simple-select"
                        placeholder={"Enter " + headerName}
                        value={data}

                        variant={"outlined"}
                        onChange={e => onSelectChange(e, field)}
                        inputProps={{id: 'my-select'}}
                        label={headerName}
                >
                    {options.map((entry) =>
                        <MenuItem className="my-menu-item label"
                                  key={getUniqueId()}
                                  variant={"outlined"}
                                  value={entry}> {entry}
                        </MenuItem>
                    )}

                </Select>
            </FormControl>
            :
            <div>Loading...</div>
    )
}

export default DropDown;

