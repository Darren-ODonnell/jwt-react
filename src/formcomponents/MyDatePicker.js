import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DATE_FORMAT} from "../common/globals";
import {getMaxDate, getMinDate, getUniqueId} from "../common/helper";
import {TextField} from "@mui/material";
import React, {useState} from "react";
import moment from "moment/moment";

const MyDatePicker = ({formData, field, headerName}) => {
    const [dateValue, setDateValue] = useState()

    const onChangeDate = (value, id) => {
        formData[field] = moment(value).format(DATE_FORMAT)
        console.log("Value: " + value)
        console.log("FormData[field]: " + formData[field])
        setDateValue(formData[field])
    }

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DatePicker
                // key = {key}
                // format      = {DATE_FORMAT}
                // id          = {field}
                minDate={getMinDate()}
                maxDate={getMaxDate()}
                value={dateValue}
                onChange={e => onChangeDate(e, field)}
                label={headerName}
                renderInput={(props) =>
                    <TextField {...props}
                               style={{borderStyle: 'black', fontcolor: 'black', position: 'left', width: '50%'}}
                               id={field}
                    />
                }
            />
        </LocalizationProvider>

    )
}

export default MyDatePicker;