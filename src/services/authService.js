import jwtDecode from 'jwt-decode';
import http from './httpService';

const apiEndpoint = `/auth`;
const tokenKey = 'token';

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
export async function updateJWTToken(email) {
  const { data: jwt } = await http.post(`${apiEndpoint}/updateToken`, {
    email,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
http.setJwt(getJwt());

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
