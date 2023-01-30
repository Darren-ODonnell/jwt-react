import AuthService from "../auth/AuthService";
import instance from "./axios";
import {useAxios} from "../api/ApiService";


export const GetData = ( { method, url, setFormData, data, error, loading, axiosApi } ) => {
    // clean up controller
    let isSubscribed = true;
    loading = true
    const user = AuthService.getCurrentUser();
    AuthService.setAuthToken( user.accessToken );
    axiosApi( {
        axiosInstance: instance,
        method: method,
        url: url
    } ).then( () => {

        // setFormData( [ ...data ] );
        // loading = false

    } )
    // cancel subscription to useEffect
    return () => ( isSubscribed = false )

}

// export default GetData;
