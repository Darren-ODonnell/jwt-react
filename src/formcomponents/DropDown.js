import React from 'react';
import {MenuItem, Select, FormControl} from "@mui/material";
import {getUniqueId} from "../common/helper";
import {useState} from "react";

const DropDown = (formData, field, onChange, type, key, headerName, style, options) => {
    const [data, setData] = useState(formData[field])

    let defaultValue = (formData[field]) ? (formData[field]) : ""

    console.log("Field: " + field)
    console.log("FormData: " + formData)
    console.log("Options: " + options)

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
                key={getUniqueId()}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={ getBooleanValue(data) }
                // valuedefault={ getBooleanValue(defaultValue) }
                value={data}
                valuedefault={defaultValue}
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

