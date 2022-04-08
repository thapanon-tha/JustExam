import axios from 'axios';

const BACKEND_HOST = 'http://localhost:3000';

const channels = (query = {}) => axios.get(`${BACKEND_HOST}/api/channels?type=teacher`, { params: query, validateStatus: false });

const channelsDetail = (cid) => Promise.all([axios.get(`${BACKEND_HOST}/api/channels/${cid}?type=teacher`, { validateStatus: false }), axios.get(`${BACKEND_HOST}/api/channels/${cid}/options`, { validateStatus: false })]);

const joinChannel = (cid, data) => axios.post(`${BACKEND_HOST}/api/channels/${cid}/members`, { data }, { validateStatus: false });

export default {
  channels,
  channelsDetail,
  joinChannel,
};
