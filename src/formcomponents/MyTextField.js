import {TextField} from "@mui/material";
import React, { useEffect, useState } from "react";
import {getUniqueId} from "../common/helper";

const MyTextField = ({onChange, headerName, value}) => {

    const textFieldParams = {
        placeholder: "Enter " + headerName,
        label: headerName,
        value: value ? value : undefined,
        onChange: e => onChange(e),
        variant: "outlined",
    }

    return (<TextField  {...textFieldParams} fullWidth/>)
}
export default MyTextField;