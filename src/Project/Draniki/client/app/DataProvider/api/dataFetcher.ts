import axios from 'axios';

export default (url: string, data?: any) =>
  axios({
    data,
    method: data ? 'POST' : 'GET',
    url,
    withCredentials: true,
  });
