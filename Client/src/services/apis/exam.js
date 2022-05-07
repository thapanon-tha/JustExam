import axios from 'axios';
import mapperTool from './examMapper';

const BACKEND_HOST = process.env.VUE_APP_API;

const exams = () => axios.get(`${BACKEND_HOST}/api/exams`, { validateStatus: false });

const examDetail = (eid) => axios.get(`${BACKEND_HOST}/api/exams/${eid}`, { validateStatus: false });
const updateExamDetail = (eid, data) => axios.put(`${BACKEND_HOST}/api/exams/${eid}`, { data }, { validateStatus: false });

const examList = (eid) => axios.get(`${BACKEND_HOST}/api/exams/${eid}/questions`, { validateStatus: false });

const deleteExams = (eid) => axios.delete(`${BACKEND_HOST}/api/exams/${eid}`, { validateStatus: false });

const createExams = async (examData) => axios.post(
  `${BACKEND_HOST}/api/exams`,
  {
    data: { ...examData },
  },
  { validateStatus: false },
);

const loginGoogle = async () => axios.get(`${BACKEND_HOST}/api/auth/google`, { validateStatus: false });

const createQuestions = async (eid, data) => axios.post(`${BACKEND_HOST}/api/exams/${eid}/questions`, { data }, { validateStatus: false });
const updateQuestions = async (eid, data) => axios.put(`${BACKEND_HOST}/api/exams/${eid}/questions`, { data }, { validateStatus: false });

const examMapper = (examData) => examData.map((element) => mapperTool.mapper(element));
const reverse = (examData) => mapperTool.convertToCLI(examData);

export default {
  exams,
  examList,
  createExams,
  loginGoogle,
  examMapper,
  createQuestions,
  reverse,
  updateQuestions,
  examDetail,
  updateExamDetail,
  deleteExams,
};
