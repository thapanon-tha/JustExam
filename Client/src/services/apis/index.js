import userAPI from './user/user';
import examAPI from './exam';

export default {
  ...userAPI,
  ...examAPI
};
