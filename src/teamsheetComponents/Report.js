import React, {useRef, useEffect} from 'react';
import {Table} from '@mui/material';
import {TableHead} from '@mui/material';
import {TableRow} from '@mui/material';

import './TeamsheetReport.css'
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
// import Header from "./Header";



const Report = () => {

    // const tableRef = useRef(null);

    console.log("Report: top :...")

    // const getHeader = (data) => {
    //     const row = data[0]
    //
    //     const header = {
    //         competitionNameIrish: row.fixture.competition.irishName,
    //         homeTeamNameIrish: row.fixture.homeTeam.irishName,
    //         awayTeamNameIrish: row.fixture.awayTeam.irishName,
    //         competitionName: row.fixture.competition.name,
    //         homeTeamName: row.fixture.homeTeam.name,
    //         awayTeamName: row.fixture.awayTeam.name,
    //     }
    //     return header;
    // }
    //
    // const getTeam1to15 = (data) => {
    //     let players = []
    //     for (let i = 0; i < 15; i++) {
    //         const player = {
    //             position: data[i].player.position,
    //             name: data[i].player.name,
    //             irishName: data[i].player.irishName,
    //         }
    //         players.add(player)
    //     }
    //     return players
    // }
    // const getTeamSubs = (data) => {
    //     let players = []
    //     for (let i = 16; i < data.size(); i++) {
    //         const player = {
    //             position: data[i].player.position,
    //             name: data[i].player.name,
    //             irishName: data[i].player.irishName,
    //         }
    //         players.add(player)
    //     }
    //     return players
    // }
    //
    // const header = getHeader(data)
    // const team1to15 = getTeam1to15(data)
    // const teamSubs = getTeamSubs(data)

    // useEffect(() => {
    //     const tableElement = tableRef.current;
    //     const newWindow = window.open('', '_blank');
    // }, [tableRef]);

    console.log("ReportData: " )
    return (

        <div>
            {console.log("Report start")}
            {/*<Header/>*/}
            <p className="TitleStyleUnderline">{TEAM_LIST_VERSION}</p>
            <p className="TitleStyleUnderline">{TEAM_LIST_TITLE}</p>

            {/*/!* Competition table *!/*/}
            {/*<Table className="TableCellStyle Bold">*/}
            {/*    <TableRow className="FirstRowDouble">*/}
            {/*        <td className="TableCellStyle">{TEAM_LIST_HEADER_COMPETITION_IRISH}</td>*/}
            {/*        <td className="TableCellStyle">{data.header.competitionNameIrish}</td>*/}
            {/*        <td className="TableCellStyle">{TEAM_LIST_HEADER_TEAMS_IRISH}</td>*/}
            {/*        <td className="TableCellStyle">{data.header.homeTeamNameIrish}</td>*/}
            {/*        <td className="TableCellStyle">{TEAM_LIST_HEADER_TEAMS_SEPARATOR}</td>*/}
            {/*        <td className="TableCellStyle">{data.header.awayTeamNameIrish}</td>*/}
            {/*    </TableRow>*/}

            {/*    <TableRow>*/}
            {/*        <td className="TitleTableCellStyle">{TEAM_LIST_HEADER_COMPETITION_ENGLISH}</td>*/}
            {/*        <td className="TableCellStyle">{data.header.competitionName}</td>*/}
            {/*        <td className="TitleTableCellStyle">{TEAM_LIST_HEADER_TEAMS_ENGLISH}</td>*/}
            {/*        <td className="TableCellStyle">{data.header.homeTeamName}</td>*/}
            {/*        <td className="TableCellStyle"></td>*/}
            {/*        <td> {data.header.awayTeamName}</td>*/}
            {/*    </TableRow>*/}
            {/*</Table>*/}
            {/*/!* Home Club and County table *!/*/}
            {/*<br/>*/}
            {/*<Table className="TableCellStyle Bold">*/}
            {/*    <TableRow>*/}
            {/*        <td className="TableCellStyle">{TEAM_LIST_HEADER_CLUB}</td>*/}
            {/*        <td className="TableCellStyle">{TEAM_LIST_HEADER_CLUB_NAME}</td>*/}
            {/*        <td className="TableCellStyle">{TEAM_LIST_HEADER_COUNTY}</td>*/}
            {/*        <td className="TableCellStyle">{TEAM_LIST_HEADER_COUNTY_NAME}</td>*/}
            {/*    </TableRow>*/}
            {/*</Table>*/}
            {/*<br/>*/}
            {/*/!*List of players - 1-15 *!/*/}
            {/*<Table className="my-table">*/}
            {/*    <TableHead>*/}
            {/*        <TableRow className="TableCellStyle Bold">*/}
            {/*            <td className="TableCellStyle colNumbers">{TEAM_LIST_TEAM_NOS}</td>*/}
            {/*            <td className="TableCellStyle">{TEAM_LIST_TEAM_IRISH}</td>*/}
            {/*            <td className="TableCellStyle">{TEAM_LIST_TEAM_ENGLISH}</td>*/}
            {/*        </TableRow>*/}
            {/*    </TableHead>*/}
            {/*    {data.team.map(row => (*/}
            {/*        <TableRow>*/}
            {/*            <td className="TableCellStyle">{row.number}</td>*/}
            {/*            <td className="TableCellStyle">{row.name}</td>*/}
            {/*            <td className="TableCellStyle">{row.nameIrish}</td>*/}
            {/*        </TableRow>*/}
            {/*    ))}*/}
            {/*</Table>*/}
            {/*/!*List of players - Subs - 16-25 *!/*/}
            {/*<p className="TitleStyle">{TEAM_LIST_SUBS_TITLE}</p>*/}
            {/*<Table>*/}
            {/*    {data.subs.map(row => (*/}

            {/*        <TableRow>*/}
            {/*            <td className="TableCellStyle colNumbers">{row.number}</td>*/}
            {/*            <td className="TableCellStyle">{row.name}</td>*/}
            {/*            <td className="TableCellStyle">{row.nameIrish}</td>*/}
            {/*        </TableRow>*/}
            {/*    ))}*/}
            {/*</Table>*/}

            {/*/!*Signatures *!/*/}
            {/*<div className="text-block">*/}
            {/*    <p>{TEAM_LIST_OFFICIAL_IRISH}_________________________________________ {TEAM_LIST_DATE_IRISH}__________________<br/>*/}
            {/*        {TEAM_LIST_OFFICIAL_ENGLISH}</p>*/}
            {/*    <p>{TEAM_LIST_REFEREE_IRISH}__________________________________________<br/>*/}
            {/*        {TEAM_LIST_REFEREE_ENGLISH}</p>*/}
            {/*</div>*/}

        </div>
    );
};

export default Report;




