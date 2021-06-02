import GetLogoweb from "./logoweb/get";
import GetUser from "./user/get";

// user
const APIGetUser = () => GetUser('user/get')

// logoweb
const APIGetLogoweb = () => GetLogoweb('logoweb/get')

const API = {
    APIGetUser,
    APIGetLogoweb
}

export default API;