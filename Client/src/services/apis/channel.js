import axios from 'axios';
import mapperTool from './channelMapper';

const BACKEND_HOST = 'http://localhost:3000';

const channels = (query = {}) => axios.get(`${BACKEND_HOST}/api/channels?type=teacher`, { params: query, validateStatus: false });

const channelsDetail = (cid) => Promise.all([
  axios.get(`${BACKEND_HOST}/api/channels/${cid}?type=teacher`, { validateStatus: false }),
  axios.get(`${BACKEND_HOST}/api/channels/${cid}/options`, { validateStatus: false }),
]);

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
  {
    validateStatus: false,
  },
);

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
};
