import React from 'react';
import {InputLabel, MenuItem, Select, FormControl} from "@mui/material";
import {getUniqueId} from "../common/helper";
import {useState} from "react";

const DropDown = ({ formData, field, options, style, headerName}) => {

    const [data, setData] = useState(formData[field])
    const [value, setValue] = useState('');

    // let defaultValue = (params.formData[params.field]) ? (params.formData[params.field]) : ""
    let defaultValue = (formData[field]) ? (formData[field]) : ""

    // console.log("Field: "    + params.field)
    // console.log("FormData: " + params.formData)
    // console.log("Options: "  + params.options)
    console.log("Field: "    + field)
    console.log("FormData: " + formData)
    console.log("Options: "  + options)

    const onSelectChange = (e, field) => {
        formData[field] = e.target.value
        setData( e.target.value)
    }

    // const getBooleanValue = (dataValue) => {
    //
    //     if(params.type === "boolean") {
    //         let bool = dataValue ? 1 : 0
    //         console.log("bool: "+bool)
    //         return bool
    //     } else {
    //         console.log("DataValue: " + dataValue)
    //         return dataValue
    //     }
    // }


    return (
        <FormControl style={style}>
            <Select
                key     = {getUniqueId()}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={ getBooleanValue(data) }
                // valuedefault={ getBooleanValue(defaultValue) }
                value={ data.toString() }
                valuedefault={ defaultValue.toString() }
                variant={"outlined"}
                onChange={e => onSelectChange(e, field)}
                // className={classes.root}
                //         MenuProps={{ disableScrollLock: false }}
                // MenuProps={{ classes: { paper: classes.menuPaper } }}
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

