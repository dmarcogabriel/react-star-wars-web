import axios, { AxiosResponse } from 'axios';
import humps from 'humps';

const api = axios.create({ baseURL: 'https://swapi.dev/api/' });

api.interceptors.response.use((config: AxiosResponse): AxiosResponse => ({
  ...config,
  data: humps.camelizeKeys(config.data),
}));

export default api;
