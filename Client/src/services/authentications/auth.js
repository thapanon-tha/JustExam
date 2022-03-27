// Warning !!! This should be implement with cookie method not localstroage
const getToken = () => localStorage.getItem('token') || '';

// Warning !!! This should be implement with cookie method not localstroage
const setToken = (token) => localStorage.setItem('token', token);

// Warning !!! This should be implement with cookie method not localstroage
const removeToken = () => localStorage.removeItem('token');

const getRole = () => localStorage.getItem('role') || '';
const setRole = (roleName) => localStorage.setItem('role', roleName);
const removeRole = () => localStorage.removeItem('role');

const getName = () => localStorage.getItem('name') || '';
const setName = (roleName) => localStorage.setItem('name', roleName);
const removeName = () => localStorage.removeItem('name');

export default {
  getToken,
  setToken,
  removeToken,
  getRole,
  setRole,
  removeRole,
  getName,
  setName,
  removeName,
};
