import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {RegisterPage} from './RegisterPage'
import {LoginPage} from "./LoginPage";
import {clubData} from "../entities/clubs";
import { playerData } from "../entities/players";
import { competitionData } from "../entities/competitions";
import { fixtureData } from "../entities/fixtures";
import { statnameData } from "../entities/statnames";
import { firstnameData } from "../entities/firstnames";
import { lastnameData } from "../entities/lastnames";
import { teamsheetData } from "../entities/teamsheets";
import {positionData} from "../entities/positions";
import {pitchgridData} from "../entities/pitchgrids";
import {statData} from "../entities/stats";

import AuthService from "./AuthService";

import MyDataGrid from "../grid/MyDataGrid";
import FileUpload from "../common/FileUpload";
import UserRegistration from "./UserRegistration";
import ChangePassword from "./ChangePassword";
import './Paths.css'


const Paths = () => {
    return (
        <div className="grid-wrapper">
            <Router>
                <Routes>
                    <Route exact path="/lastnames" element={<MyDataGrid props={lastnameData}/>}/>
                    <Route exact path="/lastname" element={<MyDataGrid props={lastnameData}/>}/>
                    <Route exact path="/firstnames" element={<MyDataGrid props={firstnameData}/>}/>
                    <Route exact path="/firstname" element={<MyDataGrid props={firstnameData}/>}/>
                    <Route exact path="/fixture" element={<MyDataGrid props={fixtureData}/>}/>
                    <Route exact path="/fixtures" element={<MyDataGrid props={fixtureData}/>}/>
                    <Route exact path="/fixture/list" element={<MyDataGrid props={fixtureData}/>}/>

                    <Route exact path="/club/list" element={<MyDataGrid props={clubData}/>}/>
                    <Route exact path="/club" element={<MyDataGrid props={clubData}/>}/>
                    <Route exact path="/clubs" element={<MyDataGrid props={clubData}/>}/>
                    <Route exact path="/clubsGrid" element={<MyDataGrid props={clubData}/>}/>

                    <Route exact path="/player/list" element={<MyDataGrid props={playerData}/>}/>
                    <Route exact path="/players" element={<MyDataGrid props={playerData}/>}/>
                    <Route exact path="/player" element={<MyDataGrid props={playerData}/>}/>

                    <Route exact path="/position" element={<MyDataGrid props={positionData}/>}/>
                    <Route exact path="/positions" element={<MyDataGrid props={positionData}/>}/>
                    <Route exact path="/position/list" element={<MyDataGrid props={positionData}/>}/>

                    <Route exact path="/pitchgrid" element={<MyDataGrid props={pitchgridData}/>}/>
                    <Route exact path="/pitchgrids" element={<MyDataGrid props={pitchgridData}/>}/>
                    <Route exact path="/pitchgrid/list" element={<MyDataGrid props={pitchgridData}/>}/>

                    <Route exact path="/statname/list" element={<MyDataGrid props={statnameData}/>}/>
                    <Route exact path="/statnames" element={<MyDataGrid props={statnameData}/>}/>
                    <Route exact path="/statname" element={<MyDataGrid props={statnameData}/>}/>
                    <Route exact path="/teamsheet/list" element={<MyDataGrid props={teamsheetData}/>}/>
                    <Route exact path="/teamsheets" element={<MyDataGrid props={teamsheetData}/>}/>
                    <Route exact path="/teamsheet" element={<MyDataGrid props={teamsheetData}/>}/>

                    <Route exact path="/competition" element={<MyDataGrid props={competitionData}/>}/>
                    <Route exact path="/competitions" element={<MyDataGrid props={competitionData}/>}/>
                    <Route exact path="/competition/list" element={<MyDataGrid props={competitionData}/>}/>
                    <Route exact path="/stat/list" element={<MyDataGrid props={statData}/>}/>
                    <Route exact path="/stats" element={<MyDataGrid props={statData}/>}/>
                    <Route exact path="/stat" element={<MyDataGrid props={statData}/>}/>

                    <Route excat path="/upload/players" element={<FileUpload props={playerData}/>}/>
                    <Route excat path="/upload/clubs" element={<FileUpload props={playerData}/>}/>
                    <Route excat path="/upload/fixtures" element={<FileUpload props={fixtureData}/>}/>
                    <Route excat path="/upload/competitions" element={<FileUpload props={competitionData}/>}/>
                    <Route excat path="/upload/statnames" element={<FileUpload props={statnameData}/>}/>
                    <Route excat path="/upload/teamsheets" element={<FileUpload props={teamsheetData}/>}/>

                    {/*<Route exact path="/playerStats" element={<Reports.PlayerStats/>}/>*/}
                    {/*<Route exact path="/teamStats" element={<Reports.TeamStats/>}/>*/}

                    <Route exact path="/login" element={<LoginPage/>}/>
                    <Route exact path="/register" element={<UserRegistration/>}/>

                    <Route exact path="/logout" element={<AuthService.Logout/>}/>
                    <Route exact path="/changePassword" element={<ChangePassword/>}/>

                </Routes>
            </Router>
        </div>
    );
}
export default Paths;