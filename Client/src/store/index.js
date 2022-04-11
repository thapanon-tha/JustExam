import Vue from 'vue';
import Vuex from 'vuex';
import auth from '../services/authentications';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStudent: false,
    isTeacher: false,
    isAuth: false,
    name: '',
  },
  getters: {
    getIsStudent(state) {
      return state.isStudent;
    },
    getIsTeacher(state) {
      return state.isTeacher;
    },
    getIsAuth(state) {
      return state.isAuth;
    },
    getName(state) {
      return state.name;
    },
  },
  mutations: {
    SET_IS_AUTH(state, value) {
      state.isAuth = value;
    },
    SET_IS_TEACHER(state, value) {
      state.isTeacher = value;
    },
    SET_IS_STUDENT(state, value) {
      state.isStudent = value;
    },
    SET_NAME(state, valeu) {
      state.name = valeu;
    },
  },
  actions: {
    restoreLogin({ commit }) {
      // if token not found that mean is not auth yet
      if (auth.getToken() === '') {
        commit('SET_IS_AUTH', false);
        return;
      }

      // if role not found that mean is not auth yet
      if (auth.getRole() === '') {
        commit('SET_IS_AUTH', false);
        return;
      }

      const name = auth.getName();

      // User is student
      if (auth.getToken() && auth.getRole() === 'student') {
        commit('SET_IS_AUTH', true);
        commit('SET_IS_STUDENT', true);
        commit('SET_NAME', name);
        return;
      }

      // User is teacher
      if (auth.getToken() && auth.getRole() === 'teacher') {
        commit('SET_IS_AUTH', true);
        commit('SET_IS_TEACHER', true);
        commit('SET_NAME', name);
      }
    },
    doLogout({ commit }) {
      auth.removeToken();
      auth.removeRole();
      auth.removeName();
      auth.removeUid();
      auth.removeConnectId();
      commit('SET_IS_AUTH', false);
      commit('SET_IS_TEACHER', false);
      commit('SET_IS_STUDENT', false);
      commit('SET_NAME', '');
    },
  },
});
