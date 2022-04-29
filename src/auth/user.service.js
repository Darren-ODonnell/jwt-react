import axios from "axios";
import authHeader from "./authHeader";

// const API_URL = "http://localhost:8080/";
const API_URL = "http://192.168.100.151:8080/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};
const getClubs = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};
const getPlayers = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};
const getFixtures = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};
const UserService = {
    getPublicContent,
    getClubs,
    getPlayers,
    getFixtures,
};
export default UserService;
