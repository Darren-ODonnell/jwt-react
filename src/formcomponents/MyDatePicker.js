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
        let dateStr = value.format(DATE_FORMAT).toString()  //moment(value).format(DATE_FORMAT)
        formData[id] = value.format(DATE_FORMAT).toString()
        console.log("Value: " + value.format(DATE_FORMAT).toString())
        console.log("FormData[id]: " + formData[id])
        setDateValue(formData[id])
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
                               style={{
                                   borderStyle: 'black',
                                   fontcolor: 'black',
                                   position: 'left',
                                   width: '50%',
                                   marginTop: '5px'
                               }}
                               id={field}
                    />
                }
            />
        </LocalizationProvider>

    )
}

export default MyDatePicker;