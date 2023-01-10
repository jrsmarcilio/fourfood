import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fourfood-api.herokuapp.com'
});

const brasilApi = axios.create({
  baseURL: "https://brasilapi.com.br/api"
});

export { api, brasilApi }