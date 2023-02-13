import TeamsheetReport from "./TeamsheetReport";
import { useState } from "react";

const HandlePrintPreview = (props) => {

    console.log('gridApi:', props.gridApi);
    console.log('filteredData:', props.filteredData);

    if (props.filteredData.length === 0 || props.filteredData.length > 30) {
        alert("Add Filter using Fixture Date column");
        return false
    }
    return true


}
export default HandlePrintPreview;