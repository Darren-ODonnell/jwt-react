import React, {useRef, useEffect} from 'react';
import {Table} from '@mui/material';
import {TableBody} from '@mui/material';
import {TableCell} from '@mui/material';
import {TableContainer} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableRow} from '@mui/material';
import {Paper} from '@mui/material';
import './Report.css'

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
} from "../globals";
import PageFooter from "./PageFooter";
import Header from "./Header";

const getHeader1 = (data) => {
    return null
}

const getHeader2 = (data) => {
    return null
}
const getTeam1to15 = (data) => {
    return null
}
const getTeamSubs = (data) => {
    return null
}

const Report = ({data}) => {
    const tableRef = useRef(null);

    const header1 = getHeader1(data)
    const header2 = getHeader2(data)
    const team1to15 = getTeam1to15(data)
    const teamSubs = getTeamSubs(data)


    useEffect(() => {
        const tableElement = tableRef.current;

        const newWindow = window.open('', '_blank');

    }, [tableRef]);

    return (
        <div>

            <Header/>
            <p className="TitleStyleUnderline">{TEAM_LIST_VERSION}</p>
            <p className="TitleStyleUnderline">{TEAM_LIST_TITLE}</p>

            {/* Competition table */}
            <Table className="TableCellStyle Bold">
                <TableRow className="FirstRowDouble">
                    <td className="TableCellStyle">{TEAM_LIST_HEADER_COMPETITION_IRISH}</td>
                    <td className="TableCellStyle">{data.header.competitionNameIrish}</td>
                    <td className="TableCellStyle">{TEAM_LIST_HEADER_TEAMS_IRISH}</td>
                    <td className="TableCellStyle">{data.header.homeTeamNameIrish}</td>
                    <td className="TableCellStyle">{TEAM_LIST_HEADER_TEAMS_SEPARATOR}</td>
                    <td className="TableCellStyle">{data.header.awayTeamNameIrish}</td>
                </TableRow>

                <TableRow>
                    <td className="TitleTableCellStyle">{TEAM_LIST_HEADER_COMPETITION_ENGLISH}</td>
                    <td className="TableCellStyle">{data.header.competitionName}</td>
                    <td className="TitleTableCellStyle">{TEAM_LIST_HEADER_TEAMS_ENGLISH}</td>
                    <td className="TableCellStyle">{data.header.homeTeamName}</td>
                    <td className="TableCellStyle"></td>
                    <td> {data.header.awayTeamName}</td>
                </TableRow>
            </Table>
            {/* Home Club and County table */}
            <br/>
            <Table className="TableCellStyle Bold">
                <TableRow>
                    <td className="TableCellStyle">{TEAM_LIST_HEADER_CLUB}</td>
                    <td className="TableCellStyle">{TEAM_LIST_HEADER_CLUB_NAME}</td>
                    <td className="TableCellStyle">{TEAM_LIST_HEADER_COUNTY}</td>
                    <td className="TableCellStyle">{TEAM_LIST_HEADER_COUNTY_NAME}</td>
                </TableRow>
            </Table>
            <br/>
            {/*List of players - 1-15 */}
            <Table className="my-table">
                <TableHead>
                    <TableRow className="TableCellStyle Bold">
                        <td className="TableCellStyle colNumbers">{TEAM_LIST_TEAM_NOS}</td>
                        <td className="TableCellStyle">{TEAM_LIST_TEAM_IRISH}</td>
                        <td className="TableCellStyle">{TEAM_LIST_TEAM_ENGLISH}</td>
                    </TableRow>
                </TableHead>
                {data.team.map(row => (
                    <TableRow>
                        <td className="TableCellStyle">{row.number}</td>
                        <td className="TableCellStyle">{row.name}</td>
                        <td className="TableCellStyle">{row.nameIrish}</td>
                    </TableRow>
                ))}
            </Table>
            {/*List of players - Subs - 16-25 */}
            <p className="TitleStyle">{TEAM_LIST_SUBS_TITLE}</p>
            <Table>
                {data.subs.map(row => (

                    <TableRow>
                        <td className="TableCellStyle colNumbers">{row.number}</td>
                        <td className="TableCellStyle">{row.name}</td>
                        <td className="TableCellStyle">{row.nameIrish}</td>
                    </TableRow>
                ))}
            </Table>
            {/*List of Management personnel - Table*/}
            <div className="TitleStyle page-break marginTop"/>
            <p className="TitleStyle ">{TEAM_LIST_MANAGERS_TITLE}</p>
            <Table className="TableCellStyle">
                <TableHead>
                    <TableRow className="TableCellStyle Bold">
                        <td className="ManagerCellStyleCol">{TEAM_LIST_MANAGERS_ROLE}</td>
                        <td className="ManagerCellStyle">{TEAM_LIST_MANAGERS_NAME_IRISH}</td>
                        <td className="ManagerCellStyle">{TEAM_LIST_MANAGERS_NAME_ENGLISH}</td>
                    </TableRow>
                </TableHead>
                {data.footer.map(row => (

                    <TableRow className="ManagerCellStyle">
                        <td className="TableCellStyle colManagers left">{row.role}</td>
                        <td className="TableCellStyle left">{row.nameIrish}</td>
                        <td className="TableCellStyle left">{row.name}</td>
                    </TableRow>
                ))}
            </Table>
            {/*Signatures */}
            <br/>
            <br/>
            <p>{TEAM_LIST_OFFICIAL_IRISH}_________________________________________ {TEAM_LIST_DATE_IRISH}__________________</p>
            <p>{TEAM_LIST_OFFICIAL_ENGLISH}</p>
            <br/>
            <p>{TEAM_LIST_REFEREE_IRISH}__________________________________________</p>
            <p>{TEAM_LIST_REFEREE_ENGLISH}</p>
            <br/>
            <p>{TEAM_LIST_INSTRUCTIONS_IRISH}</p>
            <p>{TEAM_LIST_INSTRUCTIONS_ENGLISH}</p>
            {/* Page Footer - will appear on each page*/}
            <PageFooter message={TEAM_LIST_FOOTER} className="footer printFooter"/>
            {/*<p className="footer print-footer">{TEAM_LIST_FOOTER}</p>*/}
        </div>
    );
};

export default Report;




