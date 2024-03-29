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
                // ...requestConfig.data,
                ...requestConfig.data,
                signal: ctrl.signal
            });
            setData(res.data);
        } catch (err) {
            setError(err.response.data);
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
        fetchData().then(() => {

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


export const deleteData = (data, error, props, axiosApi, handleClose) => {
    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);

    const configObj = {
        axiosInstance: instance,
        ...props.methods.delete,
        requestConfig: {
            data: {data}
        }
    }

    return axiosApi(configObj)
       .then(() => {
           handleClose();
       })
        .catch(err => {
            window.alert(err.message)
            handleClose()
        })

}

export const getData = ({method, url}, axiosApi, handleClose) => {
    // clean up controller
    let isSubscribed = true;
    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);
    return axiosApi({
        axiosInstance: instance,
        method: method,
        url: url,
    }).then((response) => {
        return response.data
    }).catch(() => {
        handleClose()
    })        // cancel subscription to useEffect
    return () => (isSubscribed = false)
}

export const UpdateData = ({methods, axiosApi, formValues}) => {
    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);

    const configObj = {
        axiosInstance: instance,
        ...methods.update,
        requestConfig: {
            data: formValues
        }
    };

    return axiosApi(configObj)
       .then((response) => {
           return response.data;

       })
       .catch(err => {
           window.alert(err.message);

       });
};

export const UpdateDataAll = ({methods, axiosApi, formValues}) => {
    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);

    const configObj = {
        axiosInstance: instance,
        ...methods.updateAll,
        requestConfig: {
            data: formValues
        }
    };

    return axiosApi(configObj)
       .then((response) => {
           return response.data;

       })
       .catch(err => {
           window.alert(err.message);
       });
};

// save single object
export const AddData = ({methods, axiosApi, rowData, formValues}) => {
    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);

    const configObj = {
        axiosInstance: instance,
        ...methods.add,
        requestConfig: {
            data: {...formValues}
        }
    };


    return axiosApi(configObj)
       .then(response => {
           rowData = response.data;
           return rowData;
       })
       .catch(() => {
           return null;
       });
};

// save an array of objects
export const AddDataAll = ({methods, axiosApi, rowData, formValues}) => {
    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken(user.accessToken);
    const configObj = {
        axiosInstance: instance,
        ...methods.addAll,
        requestConfig: {
            data: formValues
        }
    };
    return axiosApi(configObj)
       .then(response => {
           rowData = response.data;
           return rowData;
       })
       .catch(() => {
           return null;
       });
};



export default ApiService;