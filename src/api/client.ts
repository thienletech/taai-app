import { API_BASE_URL } from '@src/constant/env';
import axios from 'axios';

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

client.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    return await Promise.reject(error);
  }
);

export const fetch = async (method: string, url: string, params: any, headers = {}) => {
  const config = {
    method,
    url,
    headers: { 'Content-type': 'application/json', ...headers },
    data: {},
    params: {},
  };

  if (method.toLowerCase() === 'get') config.params = params;
  else config.data = params;

  let response = null;
  try {
    response = await client(config);
  } catch (error) {
    console.log(error);
  }

  return response;
};

export interface ResponseData {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export default client;
