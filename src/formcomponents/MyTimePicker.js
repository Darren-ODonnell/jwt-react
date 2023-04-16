import React, {useEffect, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import moment from "moment/moment";
import {TextField} from "@mui/material";

import {getMaxTime, getMinTime, getUniqueId} from "../common/helper";
import {TIME_FORMAT, TIME_FORMAT_SAVE} from "../common/globals";


const MyTimePicker = ({formValues, field, headerName}) => {
   const [timeValue, setTimeValue] = useState();

   const onChangeTime = (value) => {
      // update field with data from user
      // data updated here first, then screen is updated
      let timeMs = moment(value.$d, TIME_FORMAT)

      formValues[field] = timeMs.format(TIME_FORMAT_SAVE)
      setTimeValue(timeMs)
   }
   useEffect(() => {

      setTimeValue(formValues[field])
   }, [formValues])
   return (
      <LocalizationProvider key={getUniqueId() + 300 + ''} dateAdapter={AdapterDayjs}>
         <TimePicker
            key={field}
            ampm={false}
            id={field}
            format="HH:mm"
            minTime={getMinTime()}
            maxTime={getMaxTime()}
            value={moment(timeValue, TIME_FORMAT)}
            disableMinutes={false}
            onChange={e => onChangeTime(e, field)}
            openTo='hours'
            placeholder={"Enter " + headerName}
            label={headerName}
            minutesStep={15}
            renderInput={(props) =>
               <TextField {...props}
                          style={{
                             backgroundColor: '#f2f2f2',
                             borderStyle: 'black',
                             fontcolor: 'black',
                             position: 'left',
                             width: '47%',
                             marginTop: '5px',
                             marginLeft: '15px',
                          }}
                          id={field}
               />}
         />
      </LocalizationProvider>
   )
}
export default MyTimePicker;