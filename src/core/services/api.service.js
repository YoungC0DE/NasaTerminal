import axios from 'axios'

const clientAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

clientAxios.defaults.params = {
  api_key: import.meta.env.VITE_API_KEY
}

export default clientAxios;
