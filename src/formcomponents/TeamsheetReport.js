import React, {useState} from "react";

function TeamsheetReport() {
  const [reportData, setReportData] = useState({
    title: "Report Title",
    date: "Report Date",
    content: "Report Content"
  });

  return (
      <div className="report-container" style={styles.container}>
        <h1 style={styles.title}>{reportData.title}</h1>
        <h2 style={styles.date}>{reportData.date}</h2>
        <p style={styles.content}>{reportData.content}</p>
      </div>
  );
}

const styles = {
  container: {
    width: "21cm",
    minHeight: "29.7cm",
    padding: "2cm",
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    textAlign: "center",
    marginTop: "1cm"
  },
  date: {
    textAlign: "right",
    marginTop: "0.5cm"
  },
  content: {
    marginTop: "1cm"
  }
};

export default TeamsheetReport;
