import { useState } from 'react';
import AuthService from "../auth/AuthService";

export const useToken = () => {
    const [ token, setTokenInternal ] = useState( () => {
        return AuthService.getAuthToken();
    });

    const setToken = newToken => {
        AuthService.setAuthToken(newToken);
        setTokenInternal( newToken );
    }
    return [ token, setToken ];
}



