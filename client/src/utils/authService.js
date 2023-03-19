import axios from 'axios';

const login = async (username, password) => {
    return await axios.post('http://localhost:8000/auth/login', { username, password })
}

const saveToken = (token) => {
    sessionStorage["token"] = token
}
const getToken = () => {
    return sessionStorage["token"]
}
const saveId = (id) => {
    sessionStorage["id"] = id
}
const getId = () => {
    return sessionStorage["id"]
}
const saveRole = (role) => {
    sessionStorage["role"] = role
}
const getRole = () => {
    return sessionStorage["role"]
}

const reset = () => {
    localStorage.clear();
}
export default { login, saveToken, getToken, saveId, getId, saveRole, getRole, reset }