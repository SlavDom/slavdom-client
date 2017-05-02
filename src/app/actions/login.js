import axios from 'axios';

export default function login(data) {
  return () => axios.post('/api/auth', data);
}
