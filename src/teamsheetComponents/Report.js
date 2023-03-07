import React, {useRef, useEffect} from 'react';
import {Table, TableBody, TableHead, TableRow} from '@mui/material';


import {
    TEAM_LIST_HEADER_COMPETITION_ENGLISH, TEAM_LIST_HEADER_COMPETITION_IRISH,
    TEAM_LIST_HEADER_TEAMS_ENGLISH, TEAM_LIST_HEADER_TEAMS_IRISH,
    TEAM_LIST_VERSION, TEAM_LIST_TITLE,
    TEAM_LIST_HEADER_TEAMS_SEPARATOR, TEAM_LIST_SUBS_TITLE,
    TEAM_LIST_HEADER_CLUB, TEAM_LIST_HEADER_CLUB_NAME,
    TEAM_LIST_HEADER_COUNTY, TEAM_LIST_HEADER_COUNTY_NAME,
    TEAM_LIST_TEAM_ENGLISH, TEAM_LIST_TEAM_IRISH,
    TEAM_LIST_TEAM_NOS, TEAM_LIST_MANAGERS_ROLE,
    TEAM_LIST_MANAGERS_TITLE, TEAM_LIST_MANAGERS_NAME_IRISH,
    TEAM_LIST_MANAGERS_NAME_ENGLISH,
    TEAM_LIST_OFFICIAL_IRISH, TEAM_LIST_DATE_IRISH,
    TEAM_LIST_OFFICIAL_ENGLISH, TEAM_LIST_REFEREE_IRISH,
    TEAM_LIST_REFEREE_ENGLISH, TEAM_LIST_INSTRUCTIONS_IRISH,
    TEAM_LIST_INSTRUCTIONS_ENGLISH, TEAM_LIST_FOOTER,
} from "../common/globals";
import './TeamsheetReport.css'
import './Report.css'
import Header from "./Header";


const Report = ({data}) => {
    let num = 0
    const tableRef = useRef(null);
    useEffect(() => {
        const tableElement = tableRef.current;

        // const newWindow = document.write('', '_blank');

    }, [tableRef]);


    return (
        <div>
            <Header/>
            <p className="TitleStyleUnderline">{TEAM_LIST_TITLE}</p>

            {/* Competition table */}
            <Table className="TableCellStyle Bold">
                <TableHead>
                    <TableRow key={num += 1} className="FirstRowDouble">
                        <td className="TableCellStyle">{TEAM_LIST_HEADER_COMPETITION_IRISH}</td>
                        <td className="TableCellStyle">{data.header.competitionIrishName}</td>
                        <td className="TableCellStyle">{TEAM_LIST_HEADER_TEAMS_IRISH}</td>
                        <td className="TableCellStyle">{data.header.homeTeamIrishName}</td>
                        <td className="TableCellStyle">{TEAM_LIST_HEADER_TEAMS_SEPARATOR}</td>
                        <td className="TableCellStyle">{data.header.awayTeamIrishName}</td>
                    </TableRow>

                    <TableRow key={num += 1}>
                        <td className="TitleTableCellStyle">{TEAM_LIST_HEADER_COMPETITION_ENGLISH}</td>
                        <td className="TableCellStyle">{data.header.competitionName}</td>
                        <td className="TitleTableCellStyle">{TEAM_LIST_HEADER_TEAMS_ENGLISH}</td>
                        <td className="TableCellStyle">{data.header.homeTeamName}</td>
                        <td className="TableCellStyle"></td>
                        <td className="TableCellStyle">{data.header.awayTeamName}</td>

                    </TableRow>
                </TableHead>
            </Table>
            {/* Home Club and County table */}
            <br/>
            <Table className="TableCellStyle Bold">
                <TableHead>
                    <TableRow>
                        <td className="TableCellStyle">{TEAM_LIST_HEADER_CLUB}</td>
                        <td className="TableCellStyle">{TEAM_LIST_HEADER_CLUB_NAME}</td>
                        <td className="TableCellStyle">{TEAM_LIST_HEADER_COUNTY}</td>
                        <td className="TableCellStyle">{TEAM_LIST_HEADER_COUNTY_NAME}</td>
                    </TableRow>
                </TableHead>
            </Table>
            <br/>
            {/*List of players - 1-15 */}
            <Table className="my-table">
                <TableHead>
                    <TableRow key={num += 1} className="TableCellStyle Bold">
                        <td className="TableCellStyle colNumbers">{TEAM_LIST_TEAM_NOS}</td>
                        <td className="TableCellStyle">{TEAM_LIST_TEAM_IRISH}</td>
                        <td className="TableCellStyle">{TEAM_LIST_TEAM_ENGLISH}</td>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.team.map(row => (
                        <TableRow key={num += 1} className="TableRowHeight">
                            <td className="TableCellStyle">{row.positionNumber}</td>
                            <td className="TableCellStyle">{row.playerIrishName}</td>
                            <td className="TableCellStyle">{row.playerName}</td>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/*List of players - Subs - 16-25 */}
            <p className="TitleStyle">{TEAM_LIST_SUBS_TITLE}</p>
            <Table>
                <TableBody>
                    {data.subs.map(row => (
                        <TableRow key={num += 1} className="TableRowHeight">
                            <td className="TableCellStyle colNumbers">{row.positionNumber}</td>
                            <td className="TableCellStyle">{row.playerIrishName}</td>
                            <td className="TableCellStyle">{row.playerName}</td>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/*Signatures */}
            <br/>
            <br/>
            <div className="text-block">
                <p>{TEAM_LIST_OFFICIAL_IRISH}_____________________________________________________________________ {TEAM_LIST_DATE_IRISH}__________________<br/>
                    {TEAM_LIST_OFFICIAL_ENGLISH}</p>
                <p>{TEAM_LIST_REFEREE_IRISH}_____________________________________________________________________<br/>
                    {TEAM_LIST_REFEREE_ENGLISH}</p>
            </div>

        </div>
    );
};

export default Report;









