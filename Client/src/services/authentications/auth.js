// Warning !!! This should be implement with cookie method not localstroage
const getToken = () => $cookies.get('token') || '';

// Warning !!! This should be implement with cookie method not localstroage
const setToken = (token) => $cookies.set('token', token);

// Warning !!! This should be implement with cookie method not localstroage
const removeToken = () => $cookies.remove('token');

const getRole = () => $cookies.get('type') || '';
const setRole = (roleName) => $cookies.set('type', roleName);
const removeRole = () => $cookies.remove('type');
const removeUid = () => $cookies.remove('uid');
const getName = () => `${$cookies.get('firstname')} ${$cookies.get('surname')}` || '';
const setName = (Name) => $cookies.set('name', Name);

const removeConnectId = () => $cookies.remove('connect.sid');
const removeName = () => {
  $cookies.remove('firstname');
  $cookies.remove('surname');
};

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
  removeUid,
  removeConnectId,
};
