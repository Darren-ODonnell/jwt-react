import TeamsheetReport from "./TeamsheetReport";
import { useState } from "react";


const HandlePrintPreview = (props) => {
    const [renderPreview, setRenderPreview] = useState(false);

    console.log('gridApi:', props.gridApi);
    console.log('filteredData:', props.filteredData);

    if (props.filteredData.length === 0 || props.filteredData.length > 30) {
        alert("Add Filter using Fixture Date column");
        return;
    }

    setRenderPreview(true);

    return renderPreview ? (
        <div>
            <TeamsheetReport />
        </div>
    ) : null;
}
export default HandlePrintPreview;