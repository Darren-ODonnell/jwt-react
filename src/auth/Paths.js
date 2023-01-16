import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegisterPage } from './RegisterPage'
import { Login2 } from "./Login2";
import { clubData } from "../entities/clubs";
import { playerData } from "../entities/players";
import { competitionData } from "../entities/competitions";
import { fixtureData } from "../entities/fixtures";
import { eventData } from "../entities/events";
import { firstnameData } from "../entities/firstnames";
import { lastnameData } from "../entities/lastnames";
import { teamsheetData } from "../entities/teamsheets";

import AuthService from "./AuthService";
import Reports from "../reports/Reports"
import MyDataGrid from "../grid/MyDataGrid";

const Paths = () =>  {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route exact path = "/lastnames"       element = {<MyDataGrid props = { lastnameData } />}  />
                    <Route exact path = "/lastname"        element = {<MyDataGrid props = { lastnameData } />}  />
                    <Route exact path = "/firstnames"      element = {<MyDataGrid props = { firstnameData }/>}  />
                    <Route exact path = "/firstname"       element = {<MyDataGrid props = { firstnameData }/>}  />
                    <Route exact path = "/fixture"         element = {<MyDataGrid props = { fixtureData }  />}  />
                    <Route exact path = "/fixtures"        element = {<MyDataGrid props = { fixtureData }  />}  />
                    <Route exact path = "/fixture/list"    element = {<MyDataGrid props = { fixtureData }  />}  />

                    <Route exact path = "/club/list"       element = {<MyDataGrid props = { clubData }     />}  />
                    <Route exact path = "/club"            element = {<MyDataGrid props = { clubData }     />}  />
                    <Route exact path = "/clubs"           element = {<MyDataGrid props = { clubData }     />}  />
                    <Route exact path = "/clubsGrid"       element = {<MyDataGrid props = { clubData }     />}  />

                    <Route exact path = "/player/list"     element = {<MyDataGrid props = { playerData }   />}  />
                    <Route exact path = "/players"         element = {<MyDataGrid props = { playerData }   />}  />
                    <Route exact path = "/player"          element = {<MyDataGrid props = { playerData }   />}  />

                    <Route exact path = "/event/list"      element = {<MyDataGrid props = { eventData }    />}  />
                    <Route exact path = "/events"          element = {<MyDataGrid props = { eventData }    />}  />
                    <Route exact path = "/event"           element = {<MyDataGrid props = { eventData }    />}  />
                    <Route exact path = "/teamsheet/list"  element = {<MyDataGrid props = { teamsheetData }/>}  />
                    <Route exact path = "/teamsheets"      element = {<MyDataGrid props = { teamsheetData }/>}  />
                    <Route exact path = "/teamsheet"       element = {<MyDataGrid props = { teamsheetData }/>}  />

                    <Route exact path = "/competition"     element = {<MyDataGrid props = {competitionData}/>}  />
                    <Route exact path = "/competitions"    element = {<MyDataGrid props = {competitionData}/>}  />
                    <Route exact path = "competition/list" element = {<MyDataGrid props = {competitionData}/>}  />

                    <Route exact path = "/playerStats"     element = {<Reports.PlayerStats/>       }            />
                    <Route exact path = "/teamStats"       element = {<Reports.TeamStats/>         }            />

                    <Route exact path = "/login"           element = {<Login2/>                    }            />
                    <Route exact path = "/register"        element = {<RegisterPage/>              }            />
                    <Route exact path = "/logout"          element = {<AuthService.Logout/>        }            />
                    <Route exact path = "/changePassword"  element = {<AuthService.ChangePassword/>}            />
                    <Route exact path = "/forgotPassword"  element = {<AuthService.ForgotPassword/>}            />

                </Routes>
            </Router>
        </div>
    );
}
export default Paths;