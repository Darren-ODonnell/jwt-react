import axios from "axios";
import AuthService from "./AuthService";

// const API_URL = "http://localhost:8080/";
const API_URL = "http://192.168.100.151:8080/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};
const getClubs = () => {
    return axios.get(API_URL + "user", {data:{ headers: AuthService.authHeader() }});
};
const getPlayers = () => {
    return axios.get(API_URL + "mod", { data:{headers: AuthService.authHeader() }});
};
const getFixtures = () => {
    return axios.get(API_URL + "admin", { data:{headers: AuthService.authHeader() }});
};
const UserService = {
    getPublicContent,
    getClubs,
    getPlayers,
    getFixtures,
};
export default UserService;
