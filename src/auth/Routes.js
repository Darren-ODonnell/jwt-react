import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { RegisterPage } from '../pages/RegisterPage'
import { Login2 } from "../login/Login2";
import { Navbar } from "react-bootstrap";
import { Club, Competition, Firstname, Fixture, Lastname, Player, Event, Teamsheet } from "../globals";
import { EntityDataGrid } from "../grid/EntityDataGrids";
import {NavbarSelect} from "../NavBar/NavBarSelect";
import { LoginPage } from "../pages/LoginPage";

const Routes = () =>  {
    return (
        <div className="container">
            <NavbarSelect>
                <Router>
                    <Switch>
                        <Route path="/lastnames" exact>                                             <EntityDataGrid entity={Lastname}/>     </Route>
                        <Route path="/firstnames" exact>                                            <EntityDataGrid entity={Firstname}/>    </Route>
                        <Route path={["/fixtures", "/fixture/list" ]} exact>                        <EntityDataGrid entity={Fixture}/>      </Route>
                        <Route path={["/competitions", "competition/list"]} exact>                  <EntityDataGrid entity={Competition}/>  </Route>
                        <Route path={["/club/list", "/club", "/clubs","/clubsGrid"]} exact>         <EntityDataGrid entity={Club}/>         </Route>
                        <Route path={["/player/list", "/players"]} exact>                           <EntityDataGrid entity={Player}/>       </Route>
                        <Route path={["/event/list", "/events"]} exact>                             <EntityDataGrid entity={Event}/>        </Route>
                        <Route path={["/teamsheet/list", "/teamsheets"]} exact>                     <EntityDataGrid entity={Teamsheet}/>    </Route>
                        <Route path={["/","/login"]} exact>                                         <LoginPage/>                               </Route>
                        <Route path="/register" exact>                                              <RegisterPage/>                         </Route>
                    </Switch>
                </Router>
            </NavbarSelect>
        </div>
    );
}
export default Routes;