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

const getemail = () => `${$cookies.get('email')}` || '';
const setemail = (Name) => $cookies.set('email', Name);

const getfirstname = () => `${$cookies.get('firstname')}` || '';
const setfirstname = (Name) => $cookies.set('firstname', Name);

const getsurname = () => `${$cookies.get('surname')}` || '';
const setsurname = (Name) => $cookies.set('surname', Name);

const getuid = () => `${$cookies.get('uid')}` || '';
const setuid = (Name) => $cookies.set('uid', Name);

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
  getfirstname,
  setfirstname,
  getsurname,
  setsurname,
  getuid,
  setuid,
  getemail,
  setemail,
};
