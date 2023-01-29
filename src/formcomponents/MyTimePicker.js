import React, {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import moment from "moment/moment";
import {TextField} from "@mui/material";

import {getMaxTime, getMinTime, getUniqueId} from "../common/helper";
import {TIME_FORMAT, TIME_FORMAT_SAVE} from "../common/globals";


const MyTimePicker = ({formData, field, headerName}) => {
    const [timeValue, setTimeValue] = useState();

    const onChangeTime = (value, id) => {
        // formData[field] = value
        // setTimeValue( formData )

        // update field with data from user
        // data updated here first, then screen is updated
        let timeMs = moment(value.$d, TIME_FORMAT)
        console.log("Time: " + timeMs + " - " + id)
        console.log(timeMs)
        formData[field] = timeMs.format(TIME_FORMAT_SAVE)
        // formData = ({...formData, [id]: timeMs.format(TIME_FORMAT_SAVE)})
        setTimeValue(timeMs)
    }

    return (
        <LocalizationProvider key={getUniqueId() + 300 + ''} dateAdapter={AdapterDayjs}>
            <TimePicker
                key={getUniqueId() + 400 + ''}
                ampm={false}
                id={field}
                format="HH:mm"
                minTime={getMinTime()}
                maxTime={getMaxTime()}
                // value       = { moment(formData[field], TIME_FORMAT) }
                value={timeValue}
                disableMinutes={false}
                onChange={e => onChangeTime(e, field)}
                openTo='hours'
                placeholder={"Enter " + headerName}
                label={headerName}
                minutesStep={15}
                renderInput={(props) =>
                    <TextField {...props}
                               style={{borderStyle: 'black', fontcolor: 'black', position: 'absolute', width: "46%"}}
                               id={field}
                    />}
            />
        </LocalizationProvider>
    )
}
export default MyTimePicker;