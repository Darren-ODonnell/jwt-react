import { useState } from 'react';
import localStorage from "redux-persist/es/storage";
import { setAuthToken } from '../api/axios';

export const useToken = () => {
    const [ token, setTokenInternal ] = useState( () => {
        return localStorage.getItem( 'token' );
    });


    const setToken = newToken => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        // useEffect(() => {
        //     const token = JSON.parse(localStorage.getItem('items'));
        //
        // }, []);
        localStorage.setItem( 'token', newToken );
        setAuthToken(token);
        setTokenInternal( newToken );
    }
    return [ token, setToken ];
}
//
// export const myHeaders = () => {
//
//     let abc = localStorage.getItem('token')
//     let token2;
//     abc.then((res) => {
//         token2 = res;
//         console.log(token2);
//     })
//
//     // const myToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWEiLCJpYXQiOjE2NDg0Njc2MDQsImV4cCI6MTY1MzY1MTYwNH0.MiL2gQKHj6h9L_3qEc52j6cbqnFVgTrkEA9iKTlIyztNlUDLNzBVrPyWDB9PLshgXAiq7riaVGJGDvLcrxR7lQ";
//     let config = {
//         headers: {
//             "Authorization": "Bearer " + token2,
//         }
//     }
//     return {config};
// }


