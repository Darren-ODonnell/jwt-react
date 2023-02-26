import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DATE_FORMAT} from "../common/globals";
import {getMaxDate, getMinDate, getUniqueId} from "../common/helper";
import {TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import moment from "moment/moment";

const MyDatePicker = ({formValues, field, headerName}) => {
    const [dateValue, setDateValue] = useState()

    const onChangeDate = (value, id) => {
        formValues[id] = value.format(DATE_FORMAT).toString()
        setDateValue(formValues[id])
    }

    useEffect(() => {
        setDateValue(formValues[field])
    }, [formValues])

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                minDate={getMinDate()}
                maxDate={getMaxDate()}
                value={dateValue}
                onChange={e => onChangeDate(e, field)}
                label={headerName}
                renderInput={(props) =>
                    <TextField {...props}
                               style={{
                                   backgroundColor: '#f2f2f2',
                                   borderStyle: 'black',
                                   fontcolor: 'black',
                                   position: 'left',
                                   width: '47%',
                                   marginTop: '5px',
                                   marginLeft: '7px',
                                   marginBottom: '5px',
                               }}
                               id={field}
                    />
                }
            />
        </LocalizationProvider>
    )
}

export default MyDatePicker;