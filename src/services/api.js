import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fourfood-api.herokuapp.com/api'
});

export { api }