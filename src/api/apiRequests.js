import  { useEffect, useState } from 'react';
import instance, {authHeader, getUser} from './axios';
import { API_AUTH_LOGIN, HOME_PAGE} from "../common/globals";

export const GetRequest = (url) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = () => {
        // token from get user object
        const user = getUser();
        // const user = JSON.parse(localStorage.getItem('user'));
        instance.defaults.headers.common['Authorization'] = "Bearer " + user.accessToken;

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
    }, [url]);

    return { error, isLoaded, data };
};
export const GetRequestTwo = (url, param) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            // token from get user object
            const user = JSON.parse(localStorage.getItem('user'));
            instance.defaults.headers.common['Authorization'] = "Bearer " + user.accessToken;

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
    }, [url,param]);

    return { error, isLoaded, data };
};
export const PostRequest = (url, param) => {}
export const PutRequest = (url, param) => {}
export const DeleteRequest = (url, param) => {}
export const GetRequestFive = (url, param) => {}

export let LoginRequest = ( loginModel) => {
    // const [data, setData] = useState('');
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [error, setError] = useState('');

    // let history = useHistory();
    let info = ''
    let isLoading = true;
    let errorMsg = '';

    // token from get user object

    return instance.post( API_AUTH_LOGIN, loginModel )

}


