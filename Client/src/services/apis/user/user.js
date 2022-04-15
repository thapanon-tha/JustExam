import axios from 'axios';

const BACKEND_HOST = 'http://localhost:3000';

const login = (email, password) => axios.post(`${BACKEND_HOST}/api/auth/login`, { email, password }, { validateStatus: false });

const register = (data) => axios.post(`${BACKEND_HOST}/api/auth/register`, { data }, { validateStatus: false });

const logout = () => '';

export default {
  login,
  logout,
  register
};
