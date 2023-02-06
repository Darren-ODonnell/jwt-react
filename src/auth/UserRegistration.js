import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import Axios from "axios";
import AuthService from "./AuthService";
import {useNavigate} from "react-router-dom";

const UserRegistration = () => {
    let {errorMessage, setErrorMessage} = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    let response = '';
    const onRegisterClicked = async () => {

        const registerUrl = 'http://localhost:8080/api/auth/register/';

        const registerData = {
            username: username,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
        }

        try {
            // res.setHeader('Access-Control-Allow-Origin', '*');
            console.log(registerData)
            response = await Axios.post(registerUrl, registerData);
            const {token} = response.data;
            AuthService.setAuthToken(token);
            navigate('/');
        } catch (e) {
            setErrorMessage(e)
            errorMessage = e;
            console.log(e)
        }
    }


    return (

        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onRegisterClicked}>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{margin: '1em 0'}}
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{margin: '1em 0'}}
            />
            <TextField
                label="Confirm Password"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                style={{margin: '1em 0'}}
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{margin: '1em 0'}}
            />

            <Button variant="contained" color="primary" type="submit" style={{margin: '1em 0'}}>
                Register
            </Button>
            <Button
                variant="contained" color="secondary" style={{margin: '1em 0'}}
                onClick={() => navigate('/login')}>Already have an account
            </Button>
        </form>


    );
};

export default UserRegistration;
