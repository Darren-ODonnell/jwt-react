import TeamsheetReport from "./TeamsheetReport";
import { useState } from "react";

const HandlePrintPreview = (props, filteredData) => {

    console.log('gridApi:', props.gridApi);
    console.log('filteredData:', filteredData);

    if (filteredData.length === 0 || filteredData.length > 30) {
        alert("Add Filter using Fixture Date column");
        return false
    }
    return true


}
export default HandlePrintPreview;