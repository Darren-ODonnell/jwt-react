import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { RegisterPage } from './RegisterPage'
import { Login2 } from "./Login2";

import { Club, Competition, Firstname, Fixture, Lastname, Player, Event, Teamsheet } from "../common/globals";
import { EntityDataGrid } from "../grid/EntityDataGrids";

import AuthService from "./AuthService";
import Reports from "../reports/Reports"
const Routes = () =>  {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path={["/lastnames","/lastname"]} exact>                            <EntityDataGrid entity={Lastname}/>     </Route>
                    <Route path={["/firstnames","/firstname"]} exact>                          <EntityDataGrid entity={Firstname}/>    </Route>
                    <Route path={["/fixture","/fixtures", "/fixture/list" ]} exact>            <EntityDataGrid entity={Fixture}/>      </Route>
                    <Route path={["/club/list", "/club", "/clubs","/clubsGrid"]} exact>        <EntityDataGrid entity={Club}/>         </Route>
                    <Route path={["/player/list", "/players", "/player"]} exact>               <EntityDataGrid entity={Player}/>       </Route>
                    <Route path={["/event/list", "/events", "/event"]} exact>                  <EntityDataGrid entity={Event}/>        </Route>
                    <Route path={["/teamsheet/list", "/teamsheets", "/teamsheet"]} exact>      <EntityDataGrid entity={Teamsheet}/>    </Route>

                    <Route path={["/competition","/competitions", "competition/list"]} exact>  <EntityDataGrid entity={Competition}/>  </Route>
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