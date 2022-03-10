const axios = require("axios");
const BACKEND_HOST = 'http://localhost'

const exams = () => {
  // Call login api here
  console.log(process.env)
  return axios.get(`${BACKEND_HOST}/api/exams`);
};

const examList = (eid) => {
  return axios.get(`${BACKEND_HOST}/api/exams/${eid}/questions`);
};

const createExams = async (examData) => {
  return axios.post(`${BACKEND_HOST}/api/exams`, { data: { title: examData.title, description: examData.description } }, { validateStatus: false });
};

const loginGoogle = async () => {
  return axios.get(`${BACKEND_HOST}/api/auth/google`);
};

const examMapper = (examData) => { };

export default {
  exams,
  examList,
  createExams,
  loginGoogle
};
