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
/* eslint-disable */
axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = `Bearer ${$cookies.get('token')}`;
/* eslint-enable */
export default {
  ...userAPI,
  ...examAPI,
  ...channelAPI,
  ...examChannelAPI,
  ...examsHub
};
