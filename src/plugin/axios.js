import axios from 'axios';

const { error, log: ll } = console;

function createAxiosInstance(options = {}) {
  const service = axios.create({
    timeout: 5000,
    ...options,
  });

  service.interceptors.response.use(
    response => {
      ll(['响应拦截'], response.config.url, 'from', options.baseURL ? 'Server' : 'Client');
      return response;
    },
    err => {
      error(['响应拦截'], 'err.stack', err.stack, 'err.config', err.config);
      return Promise.reject(err);
    }
  );
  return service;
}

export default createAxiosInstance;
