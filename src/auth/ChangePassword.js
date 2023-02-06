import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography} from '@mui/material';
import AuthService, {getCurrentUser} from '../auth/AuthService'
import Axios from "axios";
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {
    let {errorMessage, setErrorMessage} = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (newPassword !== passwordConfirm) {
            setError('Passwords do not match');
        } else {
            setError(null);
        }
    }, [newPassword, passwordConfirm]);
    let response = '';
    const handleSubmit = () => {
        const user = getCurrentUser()
        const changePasswordRequest = {
            username: user.username,
            oldPassword: oldPassword,
            newPassword: newPassword,
            paswordConfirm: passwordConfirm
        }
        const onPasswordChangeClicked = async () => {

            const changePasswordUrl = 'http://localhost:8080/api/auth/changePassword/';

            try {
                // res.setHeader('Access-Control-Allow-Origin', '*');
                console.log(changePasswordRequest)
                response = await Axios.post(changePasswordUrl, changePasswordRequest);
                const {token} = response.data;
                AuthService.setAuthToken(token);
                navigate('/');
            } catch (e) {
                setErrorMessage(e)
                errorMessage = e;
                console.log(e)
            }
        };

        return (
            <div>
                <form style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        label="Old Password"
                        type="password"
                        value={oldPassword}
                        onChange={event => setOldPassword(event.target.value)}
                        style={{margin: '1em 0'}}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={event => setNewPassword(event.target.value)}
                        style={{margin: '1em 0'}}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={passwordConfirm}
                        onChange={event => setPasswordConfirm(event.target.value)}
                        style={{margin: '1em 0'}}
                        error={Boolean(error)}
                        helperText={error}
                    />
                    <Button variant="contained" color="primary" onClick={onPasswordChangeClicked}
                            disabled={error !== null}>
                        Change Password
                    </Button>
                </form>

            </div>
        );
    };
}
export default ChangePassword;
