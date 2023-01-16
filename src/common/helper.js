// import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@mui-ui/pickers";
// import DateFnsUtils from '@date-io/date-fns';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { TextField } from "@mui/material";
import React from "react";

import {    useLocation,     useNavigate,     useParams } from "react-router-dom";
import {teams, competitions} from '../common/Dropdowns'
export const addMessage = (  entityName ) => {
    return {
        add: "Add " + entityName,
        update: "Edit " + entityName,
        create: "Create New " + entityName,
    };
}

const id = { headerName: 'id',  field: 'id',  width:80,  editable: false, filter: false, };

export const copyGridColDefs = ( columnDefs ) => {
    const newColDefs = columnDefs.map( ({ headerName, field }) => {
        return {
            headerName: headerName,
            field: field,
            width: 150,
        }
    } );

    // add grid actions update and delete to end of row and id defs to start of row
    // return [id,...newColDefs, actions];
    return [id,...newColDefs];
}

// move to FormDialog
export const copyFormColDefs = ( columnDefs ) => {
    return columnDefs.map( ( prop ) => {
        return {
            headerName: prop.headerName,
            field     : prop.field,
            type      : prop.type,
            min       : prop.min,
            max       : prop.max,
            required  : prop.required
        }
    } );
}

export const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    cellEditorPopup: true,
    floatingFilter: true,
    resizable: true,
};

export function isEmptyObject(obj){
    const array = JSON.stringify(obj);
    return  (array === '{}') || (array === "null");

}

// export function datePicker ()  {
//     // eslint-disable-next-line no-self-compare
//     const [value, setValue] = React.useState<Date | null>null;
//     return (
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//             <KeyboardDatePicker
//                 fullWidth
//                 format="MM/dd/yyyy"
//                 margin="normal"
//                 id="date-picker-dialog"
//                 label="Date picker dialog"
//                 value={value}
//                 onChange={(newValue) => {
//                     setValue(newValue)
//                 }}
//                 KeyboardButtonProps={{
//                     'aria-label': 'change date',
//                 }}
//                 renderInput={(params) => <TextField {...params} />}
//             />
//         </MuiPickersUtilsProvider>
//     )
// }

// export function timePicker() {
//     // eslint-disable-next-line no-self-compare
//     const [value, setValue] = useState<Date | null>null;
//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <TimePicker
//                 label="Time"
//                 value={value}
//                 onChange={(newValue) => {
//                     setValue(newValue);
//                 }}
//                 renderInput={(params) => <TextField {...params} />}
//             />
//         </LocalizationProvider>
//     )
// }

export const refreshPage = () => {
    window.location.reload();
}

// export function selectSeason () {
//     const year = Date.year;
//     const seasons = [year, year+1, year+2];
//
//     // select one from these 3 years
// }
// export function selectRound () {
//     const rounds = [1,2,3,4,5,6,7,8,9,10,11,12];
//
//     // select one from these 12 rounds
// }



export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}