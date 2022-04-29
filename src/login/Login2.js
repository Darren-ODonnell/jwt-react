import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import instance, {setAuthToken} from "../api/axios";
import { API_AUTH_LOGIN, CLUB_LIST } from "../globals";
import '../styles.css';
import {render} from "react-dom";
import {LoginRequest} from "../api/apiRequests";

export const Login2 = () => {
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    console.log("Inside Login2")
    let history = useHistory();

    let loginModel = {
        username: '',
        password: ''
    }
    const createHeader = (token) => {
        return {headers: {Authorization: "Bearer " + token,}}
    }

    function updateState(userObj) {
        const header = createHeader(userObj.accessToken);
        setAuthToken(userObj.accessToken);
        localStorage.setItem("user", JSON.stringify(userObj));
        instance.defaults.headers.common['Authorization'] = userObj.accessToken;
        localStorage.setItem('headers', JSON.stringify(header));
    }

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        console.log("HandleSubmit: " + event)

        loginModel.username = usernameValue;
        loginModel.password = passwordValue;

        LoginRequest(loginModel)
            .then( response => {
                console.log( "Response: " + response.data )
                updateState( response.data )
                setIsSubmitted( true );
                history.push( CLUB_LIST );
            }, error => {
                console.log( "Error:-- " + error )
                const message = "Login Failed: Username or Password Incorrect - Please try again";
                setErrorMessage( message )
                alert( message );
                setIsSubmitted( false );
                return null;
            } );



        // LoginRequest(loginModel)
        //      .then ( data  => {
        //          console.log(data);
        //          localStorage.setItem('user', data);
        //          setIsSubmitted(true);
        //          updateState(data);
        //          history.push( CLUB_LIST );
        //      },
        //      error  => {
        //          console.log(error);
        //
        //          setIsSubmitted(false);
        //          alert(error);
        //      })


        // instance.post(API_AUTH_LOGIN, loginModel)
        //     .then(response => {
        //         console.log("Response: " + response.data)
        //         updateState(response.data)
        //         setIsSubmitted(true);
        //         history.push(CLUB_LIST);
        //     }, error => {
        //         console.log("Error:-- " + error)
        //         const message = "Login Failed: Username or Password Incorrect - Please try again";
        //         setErrorMessage(message)
        //         alert(message);
        //         setIsSubmitted(false);
        //         return null;
        //     });
    }

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input
                        autoComplete="current-username"
                        type="text" name="uname" required
                        value={usernameValue}
                        onChange={e => setUsernameValue(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input
                        autoComplete="current-password"
                        type="password" name="pass" required
                        value={passwordValue}
                        onChange={e => setPasswordValue(e.target.value)}
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
