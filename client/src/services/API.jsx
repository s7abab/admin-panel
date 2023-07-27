import axios from "axios";
import Cookies from "js-cookie";

const Api = axios.create({baseURL: "http://localhost:8080"})

export default Api;