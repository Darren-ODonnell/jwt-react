import  { useEffect, useState } from 'react';
import instance  from './axios';
import { API_AUTH_URLS, API_TYPE } from "../common/globals";
import AuthService from "../auth/AuthService";

export const useAxios = () => {
    const [data      , setData]       = useState([]);
    const [error     , setError]      = useState('');
    const [loading   , setLoading]    = useState(false); //different!
    const [controller, setController] = useState(null);

    const axiosFetch = async (configObj) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;

        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });

            setData(res.data);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // useEffect cleanup function
        return () => controller && controller.abort();
    }, [controller]);

    return [data, error, loading, axiosFetch];
}


export let LoginRequest = ( loginModel) => {
    // token from get user object
    return instance.post( API_AUTH_URLS.login, loginModel )

}


const ApiService = {
    // AnotherRequest,
    // GetRequest,
    // GetRequestTwo,
    // useApiRequest,
    // useDeleteRequest,
    // PutRequest,
    // GetRequestFive,
    LoginRequest,
    // useGetRequest,
    // usePostRequest,
    // usePutRequest
    // useResource
};
export default ApiService;