export default function authHeader() {
    // check if user exists in localstorage before checking the token
    if(localStorage.getItem('user')===null) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            return {Authorization: 'Bearer ' + user.accessToken};
        }
    }
    return {};
}
