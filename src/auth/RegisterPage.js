import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import AuthService from "./AuthService";

export const RegisterPage = () => {
    let { errorMessage, setErrorMessage } = useState( '' );
    const [ usernameValue, setUsernameValue ] = useState( '' );
    const [ emailValue, setEmailValue ] = useState( '' );
    const [ passwordValue, setPasswordValue ] = useState( '' );
    const [ confirmPasswordValue, setConfirmPasswordValue ] = useState( '' );
    const navigate = useNavigate();


    let response = '';
    const onRegisterClicked = async () => {

        const registerUrl = 'http://localhost:8080/api/auth/register/';

        const registerData = {
            username       : usernameValue,
            email          : emailValue,
            password       : passwordValue,
            confirmPassword: confirmPasswordValue,
        }

        try {
            // res.setHeader('Access-Control-Allow-Origin', '*');
            response = await Axios.post( registerUrl, registerData );
            const { token } = response.data;
            AuthService.setAuthToken( token );
            navigate( '/' );
        } catch ( e ) {
            setErrorMessage( e )
            errorMessage = e;
        }
    }

    return (
        <div className="content container">
            <h1>Register</h1>
            { errorMessage && <div className="fail">{ errorMessage }</div> }

            <input
                value={ usernameValue }
                onChange={ e => setUsernameValue( e.target.value ) }
                placeholder="username"/>
            <input
                value={ emailValue }
                onChange={ e => setEmailValue( e.target.value ) }
                placeholder="someone@gmail.com"/>
            <input
                value={ passwordValue }
                onChange={ e => setPasswordValue( e.target.value ) }
                type="password"
                placeholder="password"/>

            <input
                value={ confirmPasswordValue }
                onChange={ e => setConfirmPasswordValue( e.target.value ) }
                type="password"
                placeholder="password"/>

            <hr/>
            <button
                disabled={ !usernameValue || !emailValue || !passwordValue || passwordValue !== confirmPasswordValue }
                onClick={ onRegisterClicked }
            >Register
            </button>

            <button
                onClick={ () => navigate( '/login' ) }>Already have an account
            </button>
        </div>

    )
}