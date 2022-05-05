import  { useEffect, useState } from 'react';
import instance  from './axios';
import { API_AUTH_LOGIN, HOME_PAGE} from "../common/globals";
import AuthService from "../auth/AuthService";
import useAxios from "axios-hooks";



const Test = (url) => {
    const [{ data, loading, error }] = useAxios(
        url
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return {data, loading, error};
}


export const GetRequest2 = (url) => {
    const { data, loading, error } = Test(url)

    console.log("Data: "+ data)
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
    //
    //     fetchData();
    // }, [url]);

    return { data, loading, error };
};
// export const GetRequestTwo = (url, param) => {
//     const [data, setData] = useState([]);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchData = () => {
//             // token from get user object
//             const user = AuthService.getCurrentUser();
//             AuthService.setAuthToken(user.accessToken)
//
//             instance.get(url , param)
//                 .then(response => {
//                     setIsLoaded(true);
//                     setData(response.data);
//                 })
//                 .catch(error => {
//                     setIsLoaded(true);
//                     setError(error);
//
//                 });
//         };
//         fetchData();
//     }, [url,param]);
//
//     return { error, isLoaded, data };
// };
// export const PostRequest = (url, param) => {}
// export const PutRequest = (url, param) => {}
// export const DeleteRequest = (url, param) => {}
// export const GetRequestFive = (url, param) => {}
//
// export let LoginRequest = ( loginModel) => {
//     // const [data, setData] = useState('');
//     // const [isLoaded, setIsLoaded] = useState(false);
//     // const [error, setError] = useState('');
//
//     // let history = useHistory();
//     let info = ''
//     let isLoading = true;
//     let errorMsg = '';
//
//     // token from get user object
//
//     return instance.post( API_AUTH_LOGIN, loginModel )
//
// }
//
//
