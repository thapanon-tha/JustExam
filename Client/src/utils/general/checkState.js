import auth from '../../services/authentications';

const isAuth = () => {
  /**
   * Use for check user is login to system
   */
  if (!auth.getToken() || auth.getToken() === '') return false;
  return true;
};

const isStudent = () => {
  /**
   * Use for check user is student or not.
   */
  if (!auth.getRole() || auth.getRole === '' || auth.getRole !== 'student') return false;
  return true;
};

const isTeacher = () => {
  /**
   * Use for check user is teacher or not.
   */
  if (!auth.getRole() || auth.getRole === '' || auth.getRole !== 'teacher') return false;
  return true;
};

export default {
  isAuth,
  isStudent,
  isTeacher,
};
