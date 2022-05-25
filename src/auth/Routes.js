import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
const Routes = () =>  {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path={["/lastnames","/lastname"]} exact>                            <MyDataGrid props={ lastnameData }/>     </Route>
                    <Route path={["/firstnames","/firstname"]} exact>                          <MyDataGrid props={ firstnameData }/>    </Route>
                    <Route path={["/fixture","/fixtures", "/fixture/list" ]} exact>            <MyDataGrid props={ fixtureData }/>      </Route>
                    <Route path={["/club/list", "/club", "/clubs","/clubsGrid"]} exact>        <MyDataGrid props={ clubData }/>         </Route>
                    <Route path={["/player/list", "/players", "/player"]} exact>               <MyDataGrid props={ playerData }/>       </Route>
                    <Route path={["/event/list", "/events", "/event"]} exact>                  <MyDataGrid props={ eventData }/>        </Route>
                    <Route path={["/teamsheet/list", "/teamsheets", "/teamsheet"]} exact>      <MyDataGrid props={ teamsheetData }/>    </Route>

                    <Route path={["/competition","/competitions", "competition/list"]} exact>  <MyDataGrid props={competitionData}/>  </Route>

                    <Route path="/playerStats" exact>                                          <Reports.PlayerStats/>                  </Route>
                    <Route path="/teamStats" exact>                                            <Reports.TeamStats/>                    </Route>

                    <Route path={["/login"]} exact>                                            <Login2/>                               </Route>
                    <Route path="/register" exact>                                             <RegisterPage/>                         </Route>
                    <Route path="/logout" exact>                                               <AuthService.Logout/>                   </Route>
                    <Route path="/changePassword" exact>                                       <AuthService.ChangePassword/>           </Route>
                    <Route path="/forgotPassword" exact>                                       <AuthService.ForgotPassword/>           </Route>

                </Switch>
            </Router>
        </div>
    );
}
export default Routes;