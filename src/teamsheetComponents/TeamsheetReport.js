import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Substitutes from "./Substitutes";
import Team from "./Team";

const TeamsheetReport = (props) => {
    const [reportData, setReportData] = useState({
        title: "Report Title",
        date: "Report Date",
        content: "Report Content"
    });
    // get report date

// get teamsheet based on fixture date
// extract out each of the component parts header1, header2, players 1-15, subs 16-25, managers and footer


    return (
        <div>
            <Header header={props.header}/>
            <Team team={props.team}/>
            <Substitutes substitutes={props.substitutes}/>
            <Footer footer={props.footer}/>
        </div>
    )
}
export default TeamsheetReport;
