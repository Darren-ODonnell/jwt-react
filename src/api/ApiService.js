import { useEffect, useState } from 'react';
import instance  from './axios';
import { API_AUTH_URLS } from "../common/globals";
import AuthService from "../auth/AuthService";

// token from get user object
// const user = AuthService.getCurrentUser();
// AuthService.setAuthToken(user.accessToken);

const PostRequest = (props) => {
    const [error, setError] = useState(null);
    const [, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);

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

    return { error, isLoaded };
}

const GetRequest = (url) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);

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
const GetRequestTwo = (url, param) => {
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

// const PutRequest = (url, param) => {}
// const DeleteRequest = (url, param) => {}
// const GetRequestFive = (url, param) => {}

export let LoginRequest = ( loginModel) => {
    // token from get user object
    return instance.post( API_AUTH_URLS.login, loginModel )

}
const AnotherRequest = (props) => {
    const [isLoaded, ] = useState(false);
    // const [error, setError] = useState(null);
    // const [data, setData] = useState([]);
    const error = null;
    // const isLoaded = false;
    const data = [];

    console.log("AnotherRequest: ",props)

    return { error, isLoaded, data };
}

const ApiService = {
    AnotherRequest,
    PostRequest,
    GetRequest,
    GetRequestTwo,
    // DeleteRequest,
    // PutRequest,
    // GetRequestFive,
    LoginRequest,
};
export default ApiService;