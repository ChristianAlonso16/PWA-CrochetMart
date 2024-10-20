import jwt_decode from 'jwt-decode';

const getRole = () => {
    const { roles } = jwt_decode(localStorage.getItem("token"));
    const roleName = roles[0].authority;
    return roleName
}
const getUserName = () => {
    const { sub } = jwt_decode(localStorage.getItem("token"));
    return sub;
}
const session = () => {
    const { roles, sub } = jwt_decode(localStorage.getItem("token"));
    const roleName = roles[0].authority;
    return roleName !== null && sub !== null;
}
const getToken = () => {
    return localStorage.getItem("token")
}

export default {
    getRole,
    getToken,
    getUserName,
    session
}