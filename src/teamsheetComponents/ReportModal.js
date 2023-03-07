import React from "react";
import {Dialog, DialogTitle, DialogContent, Button} from "@mui/material";
import Report from "./Report";
import {printPopup} from "../common/helper";
import './Report.css'
import './TeamsheetReport.css'

const ReportModal = ({open, onClose, data}) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Print Preview</DialogTitle>
            <DialogContent>
                <Report data={data}/>
                <div className="print-hide">
                    <Button onClick={printPopup}>Print Data</Button>}
                    <Button onClick={() => onClose()}>Close Popup Modal</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReportModal;
