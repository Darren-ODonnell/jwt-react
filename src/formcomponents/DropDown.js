import React from 'react';
import {InputLabel, MenuItem, Select} from "@mui/material";
import {getUniqueId} from "../common/helper";
import {useState} from "react";


const DropDown = ({formData, field, options, style, headerName}) => {

    const [data, setData] = useState(formData[field])
    const [value, setValue] = useState('');

    let defaultValue = (formData[field]) ? (formData[field]) : ""

    console.log("Field: " + field)
    console.log("FormData: " + formData)
    console.log("Options: " + options)

    const onSelectChange = (e, field) => {
        formData[field] = e.target.value
        setData(formData)
    }

    return (
        <div>
            <InputLabel id="demo-simple-select-label">{field}</InputLabel>
            <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={data[field]}
                onChange={e => onSelectChange(e, field)}
                defaultValue={defaultValue}
                // className={classes.root}
                //         MenuProps={{ disableScrollLock: false }}
                // MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
                {options.map((entry) =>
                    <MenuItem
                        key={getUniqueId() + 100 + ''}
                        label={headerName}
                        value={entry}>{entry}</MenuItem>
                )}
            </Select>

        </div>
    )
}

export default DropDown;

// <Select className={classes.select} key={getUniqueId() + 50 + ''} defaultValue={defaultValue}
//         value={formData[field]}
//         MenuProps={{ disableScrollLock: false }}
//         onChange={e => onSelectChange(e, field)}
// >