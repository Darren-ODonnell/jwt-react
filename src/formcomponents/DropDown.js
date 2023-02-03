import React from 'react';
import {MenuItem, Select, FormControl} from "@mui/material";
import {getUniqueId} from "../common/helper";
import {useState} from "react";

const DropDown = (formData, field, onChange, type, key, headerName, style, options) => {
    const [data, setData] = useState(formData[field])

    let defaultValue = (formData[field]) ? (formData[field]) : ""

    const onSelectChange = (e, field) => {
        formData[field] = e.target.value
        setData( ...formData , [field] = e.target.value)
    }

    return (
        <FormControl style={style}>
            <Select
                key={getUniqueId()}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data}
                valuedefault={defaultValue}
                variant={"outlined"}
                onChange={e => onSelectChange(e, field)}
            >
                {options.map((entry) =>
                        <MenuItem
                            key={getUniqueId() + 100 + ''}
                            variant={"outlined"}
                            label={headerName}
                            value={entry}>{entry}</MenuItem>
                    )}

            </Select>
        </FormControl>

    )
}

export default DropDown;

