import axios from 'axios';

const api = axios.create({
  baseURL: 'http://0.0.0.0:8080/api'
});

const brasilApi = axios.create({
  baseURL: "https://brasilapi.com.br/api"
});

export { api, brasilApi }