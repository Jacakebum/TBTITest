import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000
});

// 保存TBTI测试记录
export const saveTbtiRecord = (data) => {
  return api.post('/save-tbti-record', data);
};