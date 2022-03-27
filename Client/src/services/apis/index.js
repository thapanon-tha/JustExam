import userAPI from './user/user';
import examAPI from './exam';
import channelAPI from './channel';

export default {
  ...userAPI,
  ...examAPI,
  ...channelAPI,
};
