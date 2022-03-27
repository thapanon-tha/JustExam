const axios = require("axios");
const BACKEND_HOST = 'http://localhost:3000'
const mapperTool = require('./examMapper.js');

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

const createQuestions = async (eid, data) => {
  return axios.post(`${BACKEND_HOST}/api/exams/${eid}/questions`, { data: data }, { validateStatus: false });
};


const examMapper = (examData) => {
  const result = examData.map(element => {
    return mapperTool.mapper(element)
  });
  return result
};

export default {
  exams,
  examList,
  createExams,
  loginGoogle,
  examMapper,
  createQuestions
};
