import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import AuthService from '../auth/AuthService'
import instance from "../api/axios";

import {refreshPage} from "../common/helper";
import {useAxios} from "../api/ApiService";

const ChangePassword = () => {
    const [message, setMessage] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');


    const [data, error, loading, axiosApi] = useAxios()

    const onPasswordChangeClicked = () => {
        const user = AuthService.getCurrentUser();
        AuthService.setAuthToken(user.accessToken);

        const changePasswordDetails =  {
            username : user.username,
            oldPassword : oldPassword,
            newPassword : newPassword,
            passwordConfirm : passwordConfirm,
        }

        const configObj = {
            axiosInstance: instance,
            method: "POST",
            requestConfig: {
                data: {...changePasswordDetails}
            }
        }

        axiosApi(configObj)
            .then(response => {

            })
            .catch(err => {

            })
        refreshPage()

    }

    return (
        <div>
            <form style={ { display: 'flex', flexDirection: 'column' } }>
                <TextField
                    label="Old Password"
                    type="password"
                    value={ oldPassword }
                    onChange={ event => setOldPassword( event.target.value ) }
                    style={ { margin: '1em 0' } }
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
                <Button variant="contained" color="primary" onClick={onPasswordChangeClicked}>
                    Change Password
                </Button>
                <p>{message}</p>
            </form>

        </div>
    );
}
export default ChangePassword;
