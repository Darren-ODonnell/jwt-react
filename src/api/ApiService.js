import  { useEffect, useState } from 'react';
import instance  from './axios';
import {API_AUTH_URLS} from "../common/globals";
import AuthService from "../auth/AuthService";

export const useAxios = () => {
    const [data      , setData]       = useState([]);
    const [error     , setError]      = useState('');
    const [loading   , setLoading]    = useState(false); //different!
    const [controller, setController] = useState(null);

    const axiosApi = async (configObj) => {
        // spread out configObj
        const {axiosInstance, method, url, requestConfig = {}} = configObj;

        try {
            const ctrl = new AbortController();
            setLoading(true);
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig.data,
                signal: ctrl.signal
            });
            setData(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // useEffect cleanup function
        return () => controller && controller.abort();
    }, [controller]);

    return [data, error, loading, axiosApi];
}

export let LoginRequest = (loginModel) => {
    // token from get user object
    return instance.post(API_AUTH_URLS.login, loginModel)

}
export const useAxios2 = (url) => {
    const [data, setData] = useState(null);

    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);


    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get(url);
            setData(response.data);
        };
        fetchData().then(r => {
        })
        // } catch (err) {
        //     setError(err.message);
        // } finally {
        //     setLoading(false);
        // }
    }, [url]);

    return data;
};
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