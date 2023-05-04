import axios from 'axios';

export const call = async (url, type, data) => axios({
  method: type,
  url,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${data.token}`,

  },
  data,
});
