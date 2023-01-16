import { useEffect, useState } from 'react';
import useNavigate from "react-router-dom";
import instance   from '../api/axios'
import {API_AUTH_URLS, CLUB_URLS} from "../common/globals";
import AuthService from "./AuthService";

export const LoginPage = () => {

    const [              , setLoginSuccess ]  = useState();
    const [ loading      , setLoading]        = useState(true);
    const [ usernameValue, setUsernameValue ] = useState( '' );
    const [ passwordValue, setPasswordValue ] = useState( '' );
    const [ errorMessage , setErrorMessage ]  = useState( '' );
    const navigate         = useNavigate();

    let loginModel = {username:'', password:''};


    function updateState(userObj) {
        const header = AuthService.createHeader(userObj.accessToken);
        AuthService.setAuthToken(userObj.accessToken);
        AuthService.saveCurrentUser(userObj)
        AuthService.saveHeader(header);
    }

    const onLoginClicked = () => {
        loginModel = {
            "username": usernameValue,
            "password": passwordValue
        }
        return loginModel;
    }

    ( loading &&  <>Loading...</> );

    useEffect(()=> {
        function getData() {
            loginModel.username = usernameValue;
            loginModel.password = passwordValue
            const promise = instance.post( API_AUTH_URLS.login, loginModel );

            promise.then( response => {
                setLoading( false );
                updateState( response.data )
                navigate( CLUB_URLS.list );
            }, error => {
                setLoading( false );
                setLoginSuccess(false);
                const message = "Login Failed: Username or Password Incorrect - Please try again";
                setErrorMessage( message )
                alert( message );
                return null;
            } );
        }
        getData();
    });

    return (

        <form  onSubmit={onLoginClicked}>
            <div className="content container">
                <h1> Log In</h1>
                { errorMessage && <div className = "fail">{ errorMessage }</div> }
                <input
                    type        = "text" autoComplete                         = "on"
                    value       = { usernameValue }
                    onChange    = { e => setUsernameValue( e.target.value ) }
                    placeholder = "username"/>
                <input
                    type        = "password" autoComplete                     = "on"
                    value       = { passwordValue }
                    onChange    = { e => setPasswordValue( e.target.value ) }
                    placeholder = "password"/>
                <hr/>
                <input type="submit" value="Submit" />

                <button
                    onClick = { () => navigate( '/forget-password' ) }
                >Forgot Password
                </button>
                <button
                    onClick = { () => navigate( '/register' ) }
                >Register
                </button>
            </div>
        </form>
    );
}