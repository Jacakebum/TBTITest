import axios from 'axios';

const api = axios.create({
  baseURL: '/api',//API adddress
  timeout: 10000
});

export const saveTbtiRecord = (data) => {
  return api.post('/save-tbti-record', data);
};