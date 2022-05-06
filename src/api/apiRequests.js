import { useEffect, useRef, useState } from 'react';
import instance  from './axios';
import { API_AUTH_LOGIN } from "../common/globals";
import AuthService from "../auth/AuthService";

export const GetRequest = (url) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const countRef = useRef( 0 ); // testing only = how many times this code is hit


    useEffect(() => {
        const fetchData = () => {
            // token from get user object
            const user = AuthService.getUser();
            AuthService.setAuthToken(user.accessToken)

            instance.get(url )
                .then(response => {
                    setIsLoaded(true);
                    setData(response.data);
                })
                .catch(error => {
                    setIsLoaded(true);
                    setError(error);
                });
        };
        fetchData();
    },[url]);

    return { error, isLoaded, data, setData };
};
export const GetRequestTwo = (url, param) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            // token from get user object
            const user = AuthService.getCurrentUser();
            AuthService.setAuthToken(user.accessToken)

            instance.get(url , param)
                .then(response => {
                    setIsLoaded(true);
                    setData(response.data);
                })
                .catch(error => {
                    setIsLoaded(true);
                    setError(error);

                });
        };
        fetchData();
    }, [url, param]);

    return { error, isLoaded, data, setData };
};
export const PostRequest = (url, param) => {}
export const PutRequest = (url, param) => {}
export const DeleteRequest = (url, param) => {}
export const GetRequestFive = (url, param) => {}

export let LoginRequest = ( loginModel) => {
    // token from get user object
    return instance.post( API_AUTH_LOGIN, loginModel )

}
