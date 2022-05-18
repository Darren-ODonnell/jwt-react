import  { useEffect, useState } from 'react';
import instance  from './axios';
import { API_AUTH_URLS, API_TYPE } from "../common/globals";
import AuthService from "../auth/AuthService";


// const getReq    = (url) => {     return instance.get(url); }
// const putReq    = (url) => {     return instance.put(url); }
// const postReq   = (url) => {     return instance.post(url); }
// const deleteReq = (url) => {     return instance.delete(url); }


const useApiRequest = (url, type, newData) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const user = AuthService.getCurrentUser();
            AuthService.setAuthToken( user.accessToken );
            let request = "";
            switch ( type ) {
                case API_TYPE.GET:
                    request = instance.get(url)
                    break;
                case API_TYPE.POST:
                    request = instance.post(url, newData)
                    break;
                case API_TYPE.PUT:
                    request = instance.put(url, newData)
                    break;
                case API_TYPE.DELETE:
                    request = instance.delete(url, newData)
                    break;
                default:
                    break;
            }
            request
                .then( response => {
                        setIsLoaded( true );
                        setData( response.data );
                } )
                .catch( error => {
                    setIsLoaded( true );
                    setError( error );
                } );

        }
        fetchData();
    },[type, url, newData]);

    return { error, isLoaded, data  };
}

// const useGetRequest = (url) => {
//     const [data, setData] = useState([]);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchData = () => {
//             const user = AuthService.getCurrentUser();
//             AuthService.setAuthToken(user.accessToken);
//             instance.put(url )
//                 .then(response => {
//                     setIsLoaded(true);
//                     setData(response.data);
//                 })
//                 .catch(error => {
//                     setIsLoaded(true);
//                     setError(error);
//                 });
//         };
//         fetchData();
//     },[url]);
//
//     return { error, isLoaded, data  };
// };
//
// const usePostRequest = (url) => {
//     const [data, setData] = useState([]);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [error, setError] = useState(null);
//
//
//
//     useEffect(() => {
//         const fetchData = () => {
//             const user = AuthService.getCurrentUser();
//             AuthService.setAuthToken(user.accessToken);
//             instance.post(url )
//                 .then(response => {
//                     setIsLoaded(true);
//                     setData(response.data);
//                 })
//                 .catch(error => {
//                     setIsLoaded(true);
//                     setError(error);
//                 });
//         };
//         fetchData();
//     },[url]);
//
//     return { error, isLoaded, data  };
// };
//
// const usePutRequest = (url, newData) => {
//     const [data, setData] = useState([]);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchData = () => {
//             const user = AuthService.getCurrentUser();
//             AuthService.setAuthToken(user.accessToken);
//             instance.put(url, newData )
//                 .then(response => {
//                     setIsLoaded(true);
//                     setData(response.data);
//                 })
//                 .catch(error => {
//                     setIsLoaded(true);
//                     setError(error);
//                 });
//         };
//         fetchData();
//     },[url, newData]);
//
//     return { error, isLoaded, data  };
// };
//
//
// const PostRequest = (props) => {
//     const [error, setError] = useState(null);
//     const [, setData] = useState([]);
//     const [isLoaded, setIsLoaded] = useState(false);
//
//
//
//     useEffect(() => {
//         const postData = () => {
//             const user = AuthService.getCurrentUser();
//             AuthService.setAuthToken(user.accessToken);
//             instance.post(props.url , props.record)
//                 .then(response => {
//                     setIsLoaded(true);
//                     setData(response.data);
//                 })
//                 .catch(error => {
//                     setIsLoaded(true);
//                     setError(error);
//                 });
//         };
//         postData();
//     }, [props.url, props.record]);
//
//     return { error, isLoaded };
// }

const GetRequest = (url) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const user = AuthService.getCurrentUser();
            AuthService.setAuthToken(user.accessToken);
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

const PutRequest = (url, props) => {
    // const [error, setError] = useState(null);
    // const [, setData] = useState([]);
    // const [isLoaded, setIsLoaded] = useState(false);
    let isLoaded = false;
    let error = "";


    // useEffect(() => {
        const putData = () => {
            const user = AuthService.getCurrentUser();
            AuthService.setAuthToken(user.accessToken);
            instance.put(props.url , props.record)
                .then(response => {
                    isLoaded = true;
                    // isLoaded = true
                    // setData(response.data);
                })
                .catch(error => {
                    isLoaded = true;
                    // setIsLoaded(true);
                    // setError(error);
                });
        };

        putData();
    // }, []);

    return { error, isLoaded };
}
// const useDeleteRequest = (url, param) => {}
// // const GetRequestFive = (url, param) => {}

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
    GetRequest,
    GetRequestTwo,
    useApiRequest,
    // useDeleteRequest,
    PutRequest,
    // GetRequestFive,
    LoginRequest,
    // useGetRequest,
    // usePostRequest,
    // usePutRequest
};
export default ApiService;