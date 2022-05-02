import axios from 'axios';
import mapperTool from './channelMapper';

const BACKEND_HOST = process.env.VUE_APP_API;

const channels = (query = {}) => axios.get(`${BACKEND_HOST}/api/channels`, { params: query, validateStatus: false });

const channelsDetail = (cid) => Promise.all([
  axios.get(`${BACKEND_HOST}/api/channels/${cid}`, { validateStatus: false }),
  axios.get(`${BACKEND_HOST}/api/channels/${cid}/options`, { validateStatus: false }),
]);

const createChannel = (data) => axios.post(`${BACKEND_HOST}/api/channels/`, { data }, { validateStatus: false });

const channelUpdate = (cid,data) => axios.put(`${BACKEND_HOST}/api/channels/${cid}`, { data }, { validateStatus: false });

const joinChannel = (cid, data) => axios.post(`${BACKEND_HOST}/api/channels/${cid}/members`, { data }, { validateStatus: false });

const connectExamtoChennal = (data) => axios.post(`${BACKEND_HOST}/api/channels/${data.cid}/exams`, { data }, { validateStatus: false });

const createChennalQuestion = (data, cid, ecid) => axios.post(
  `${BACKEND_HOST}/api/channels/${cid}/exams/${ecid}/questions`,
  { data },
  { validateStatus: false },
);

const disconnectExamtoChennal = (cid, ecid) => axios.delete(`${BACKEND_HOST}/api/channels/${cid}/exams/${ecid}`, { validateStatus: false });

const getChannelQuestions = (cid, ecid) => axios.get(`${BACKEND_HOST}/api/channels/${cid}/exams/${ecid}/questions`, {
  validateStatus: false,
});

const channelScoreMapper = (data) => mapperTool.convertToScoreAdd(data);
const channelReverse = (data) => mapperTool.mapperPUT(data);
const updateScore = (data, cid, ecid) => axios.put(
  `${BACKEND_HOST}/api/channels/${cid}/exams/${ecid}/questions`,
  { data },
  { validateStatus: false },
);

const getMember = (cid) => axios.get(`${BACKEND_HOST}/api/channels/${cid}/members`, { validateStatus: false });
const getMemberById = (cid,mid) => axios.get(`${BACKEND_HOST}/api/channels/${cid}/members/${mid}`, { validateStatus: false });

const memberJoin = (cid, data) => axios.post(`${BACKEND_HOST}/api/channels/${cid}/members`, { data }, { validateStatus: false });

const updateRole = (data, cid, mid) => axios.put(
  `${BACKEND_HOST}/api/channels/${cid}/members/${mid}`,
  { data },
  { validateStatus: false },
);

const kickMember = (cid, mid) => axios.delete(`${BACKEND_HOST}/api/channels/${cid}/members/${mid}`, { validateStatus: false });
const updateStudentScore = (cid, data) => axios.put(`${BACKEND_HOST}/api/channels/${cid}/answer`, { data }, { validateStatus: false });

const sendemail = (cid) => axios.put(`${BACKEND_HOST}/api/channels/${cid}/sendmail`, { validateStatus: false });

export default {
  channels,
  channelsDetail,
  joinChannel,
  connectExamtoChennal,
  disconnectExamtoChennal,
  createChennalQuestion,
  getChannelQuestions,
  channelScoreMapper,
  channelReverse,
  updateScore,
  getMember,
  updateRole,
  kickMember,
  createChannel,
  memberJoin,
  updateStudentScore,
  channelUpdate,
  getMemberById,
  sendemail,
};
