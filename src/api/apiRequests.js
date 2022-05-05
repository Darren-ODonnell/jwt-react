import  { useEffect, useState } from 'react';
import instance  from './axios';
import { API_AUTH_LOGIN, HOME_PAGE} from "../common/globals";
import AuthService from "../auth/AuthService";
import useAxios from "axios-hooks";

export const GetRequest = (url) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);


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

    useEffect(() => {
        fetchData();
    },[]);

    return { error, isLoaded, data };
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
    }, []);

    return { error, isLoaded, data };
};
export const PostRequest = (url, param) => {}
export const PutRequest = (url, param) => {}
export const DeleteRequest = (url, param) => {}
export const GetRequestFive = (url, param) => {}

export let LoginRequest = ( loginModel) => {
    // token from get user object
    return instance.post( API_AUTH_LOGIN, loginModel )

}


export const GetRequestNew = (url) => {
    const [{data, loading, error}] = useAxios(url);
    // const [data, setData] = useState([]);
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [error, setError] = useState(null);

    return {data, loading, error};
    //
    // const fetchData = () => {
    //     // token from get user object
    //     const user = AuthService.getUser();
    //     AuthService.setAuthToken(user.accessToken)
    //
    //     instance.get(url )
    //         .then(response => {
    //             setIsLoaded(true);
    //             setData(response.data);
    //         })
    //         .catch(error => {
    //             setIsLoaded(true);
    //             setError(error);
    //         });
    // };
    //
    //
    // useEffect(() => {
    //     fetchData();
    // }, []);
    //
    // return { error, isLoaded, data };
};