import axios from "axios";

axios.defaults.timeout = 2000; // delete this

const api = axios.create({
    baseURL: "http://192.168.125.9:8080",
});

export default api;
