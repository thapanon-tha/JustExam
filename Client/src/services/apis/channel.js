import axios from 'axios';

const BACKEND_HOST = 'http://localhost:3000';

const channels = () => axios.get(`${BACKEND_HOST}/api/channels?type=teacher`);

const channelsDetail = (cid) => Promise.all([axios.get(`${BACKEND_HOST}/api/channels/${cid}?type=teacher`, { validateStatus: false }), axios.get(`${BACKEND_HOST}/api/channels/${cid}/options`, { validateStatus: false })]);

export default {
  channels,
  channelsDetail,
};
