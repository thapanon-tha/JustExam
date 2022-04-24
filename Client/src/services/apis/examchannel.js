import axios from 'axios';

const BACKEND_HOST = process.env.VUE_APP_API;

const getExamChannel = (cid) => axios.get(`${BACKEND_HOST}/api/channels/${cid}/startExam`, { validateStatus: false });

const postExamAnswer = (data, cid) => axios.post(`${BACKEND_HOST}/api/channels/${cid}/submitExam`, { data }, { validateStatus: false });

const queryExamPaperAndMemberAnswer = (cid, mid) => axios.get(`${BACKEND_HOST}/api/channels/${cid}/members/${mid}`, { validateStatus: false });

export default {
  getExamChannel,
  postExamAnswer,
  queryExamPaperAndMemberAnswer,
};
