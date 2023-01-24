import axios from 'axios';

const api = axios.create({
  baseURL: 'https://54.90.75.167:8080/api'
});

const brasilApi = axios.create({
  baseURL: "https://brasilapi.com.br/api"
});

export { api, brasilApi }