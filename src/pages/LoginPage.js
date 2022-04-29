import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import instance , { setAuthToken }  from '../api/axios'
import { API_AUTH_LOGIN, CLUB_LIST } from "../globals";

export const LoginPage = () => {

    const [ , setLoginSuccess ] = useState();
    const [ loading, setLoading] = useState(true);
    const [ usernameValue, setUsernameValue ] = useState( '' );
    const [ passwordValue, setPasswordValue ] = useState( '' );
    const [ errorMessage, setErrorMessage ]   = useState( '' );
    const history = useHistory();

    let loginModel = {username:'', password:''};

    const createHeader = (token) => {
        return { headers: { Authorization: "Bearer " + token, } }
    }

    function updateState(userObj) {
        const header = createHeader(userObj.accessToken);
        setAuthToken(userObj.accessToken);
        localStorage.setItem("user", JSON.stringify(userObj));
        instance.defaults.headers.common['Authorization'] = userObj.accessToken;
        localStorage.setItem('headers', JSON.stringify(header));

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
            const promise = instance.post( API_AUTH_LOGIN, loginModel );

            promise.then( response => {
                setLoading( false );
                updateState( response.data )
                history.push( CLUB_LIST );
            }, error => {
                setLoading( false );
                setLoginSuccess(false);
                const message = "Login Failed: Username or Password Incorrect - Please try again";
                setErrorMessage( message )
                alert( message );
                console.log( "Login Failed: " + error );
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
                    type = "text" autoComplete="on"
                    value = { usernameValue }
                    onChange = { e => setUsernameValue( e.target.value ) }
                    placeholder = "username"/>
                <input
                    type = "password" autoComplete="on"
                    value = { passwordValue }
                    onChange = { e => setPasswordValue( e.target.value ) }
                    placeholder = "password"/>
                <hr/>
                <input type="submit" value="Submit" />

                <button
                    onClick = { () => history.push( '/forget-password' ) }
                >Forgot Password
                </button>
                <button
                    onClick = { () => history.push( '/register' ) }
                >Register
                </button>
            </div>
        </form>
    );
}