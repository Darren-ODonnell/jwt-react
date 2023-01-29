import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getUniqueId} from "../common/helper";
import {useState} from "react";


const DropDown = ({formData, field, options}) => {
    const [data, setData] = useState(formData[field])

    let defaultValue = (formData[field]) ? (formData[field]) : ""

    console.log("Field: " + field)
    console.log("FormData: " + formData)
    console.log("Options: " + options)

    const onSelectChange = (e, field) => {
        formData[field] = e.target.value
        setData(formData)
    }

    return (
        <FormControl style={{marginTop: 5, marginBottom: 2, width: '100%'}}>
            <InputLabel>{field}</InputLabel>
            <Select key={getUniqueId() + 50 + ''} defaultValue={defaultValue}
                    value={formData[field]}
                    onChange={e => onSelectChange(e, field)}
            >
                {
                    options.map((entry) =>
                        <MenuItem
                            key={getUniqueId() + 100 + ''}
                            value={entry}>{entry}
                        </MenuItem>
                    )}
            </Select>
        </FormControl>
    )
}

export default DropDown;