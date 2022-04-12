import axios from 'axios';
import mapperTool from './channelMapper';

const BACKEND_HOST = 'http://localhost:3000';

const getExamChannel = (cid) => axios.get(`${BACKEND_HOST}/api/channels/${cid}/startExam`, { validateStatus: false });

export default {
  getExamChannel,
};
