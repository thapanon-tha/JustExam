import axios from 'axios';
import userAPI from './user/user';
import examAPI from './exam';
import channelAPI from './channel';
import examChannelAPI from './examchannel';
import examsHub from './examHub';

axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      window.location.href = '/login';
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/* eslint-disable */
axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = `Bearer ${getCookie('token')}`;
/* eslint-enable */
export default {
  ...userAPI,
  ...examAPI,
  ...channelAPI,
  ...examChannelAPI,
  ...examsHub
};
