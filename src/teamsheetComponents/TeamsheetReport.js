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
  return (
      <div>
        <Header header           = {props.header}/>
        <Team team               = {props.team}/>
        <Substitutes substitutes = {props.substitutes}/>
        <Footer footer           = {props.footer}/>
      </div>
  )
}
export default TeamsheetReport;
