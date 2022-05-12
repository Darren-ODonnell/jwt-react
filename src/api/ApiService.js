import { useEffect, useState } from 'react';
import instance  from './axios';
import { API_AUTH_LOGIN } from "../common/globals";
import AuthService from "../auth/AuthService";

const AnotherRequest = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    // const [error, setError] = useState(null);
    // const [data, setData] = useState([]);
    const error = null;
    // const isLoaded = false;
    const data = [];

    console.log("AnotherRequest: ",props)

    return { error, isLoaded, data };
}

// token from get user object
const user = AuthService.getCurrentUser();
AuthService.setAuthToken(user.accessToken);

export const PostRequest = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const postData = () => {
            instance.post(props.url , props.record)
                .then(response => {
                    setIsLoaded(true);
                    setData(response.data);
                })
                .catch(error => {
                    setIsLoaded(true);
                    setError(error);
                });
        };
        postData();
    }, [props.url, props.record]);

    return { error, isLoaded, data, setData };
}

export const GetRequest = (url) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    console.log("Url: ",url)
    useEffect(() => {
        const fetchData = () => {
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

export const PutRequest = (url, param) => {}
export const DeleteRequest = (url, param) => {}
export const GetRequestFive = (url, param) => {}

export let LoginRequest = ( loginModel) => {
    // token from get user object
    return instance.post( API_AUTH_LOGIN, loginModel )

}

const ApiService = {
    AnotherRequest,
    PostRequest,
    GetRequest,
    GetRequestTwo,
    DeleteRequest,
    PutRequest,
    GetRequestFive,
    LoginRequest,
};
export default ApiService;