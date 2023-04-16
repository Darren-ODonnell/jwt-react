import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export const LoggedInNavbar = ( props ) => {
   return (
      <Navbar bg="light" expand="lg">
         <Container className="navbar-container">
            <Navbar.Brand href="/home">St Judes GAA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/clubs">Clubs</Nav.Link>
                  <Nav.Link href="/players">Players</Nav.Link>
                  <Nav.Link href="/fixtures">Fixtures</Nav.Link>
                  <Nav.Link href="/teamsheets">Teamsheets</Nav.Link>
                  <Nav.Link href="/stats">Stats</Nav.Link>
                  <NavDropdown title="Extras" id="basic-nav-dropdown">
                     <NavDropdown.Item href="/competitions">Competitions</NavDropdown.Item>
                     <NavDropdown.Item href="/statnames">Statnames</NavDropdown.Item>
                     <NavDropdown.Divider/>
                     <NavDropdown.Item href="/positions">Positions</NavDropdown.Item>
                     <NavDropdown.Item href="/pitchgrids">Pitchgrids</NavDropdown.Item>
                     <NavDropdown.Item href="/lastnames">Lastnames</NavDropdown.Item>
                     <NavDropdown.Item href="/firstnames">Firstnames</NavDropdown.Item>
                  </NavDropdown>


               </Nav>
               <NavDropdown title={ "Welcome -> " + props.user.username }>
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                  <NavDropdown.Item href="/changePassword">Change Password</NavDropdown.Item>
               </NavDropdown>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export const LoggedOutNavbar = () => {
   return (
      <Navbar bg="light" expand="lg">
         <Container>
            <Navbar.Brand href="#home">St Judes GAA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="justify-content-end" style={ { width: "100%" } }>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}