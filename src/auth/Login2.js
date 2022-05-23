import React, { useState } from "react";
import '../styles.css';

import { LoginRequest } from "../api/ApiService";
import AuthService from "./AuthService";

export const Login2      = () => {
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [, setErrorMessage]  = useState('');
    const [isSubmitted  , setIsSubmitted]   = useState(false);

    let loginModel = {
        username: '',
        password: ''
    }

    function updateState(userObj) {
        const header = AuthService.createHeader(userObj.accessToken);
        AuthService.saveCurrentUser(userObj)
        AuthService.saveHeader(header)
        AuthService.setAuthToken(userObj.accessToken)
    }

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        console.log("HandleSubmit: " + event)

        loginModel.username = usernameValue;
        loginModel.password = passwordValue;

        LoginRequest(loginModel)
            .then( response => {

                updateState( response.data )
                setIsSubmitted( true );
                window.location = "/";
            }, error => {
                const message = "Login Failed: Username or Password Incorrect - Please try again";
                setErrorMessage( message )
                alert( message );
                setIsSubmitted( false );
                return null;
            } );



    }

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input
                        autoComplete = "current-username"
                        type         = "text" name                             = "uname" required
                        value        = {usernameValue}
                        onChange     = {e => setUsernameValue(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input
                        autoComplete = "current-password"
                        type         = "password" name                         = "pass" required
                        value        = {passwordValue}
                        onChange     = {e => setPasswordValue(e.target.value)}
                    />
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>

    );
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}
