import axios from 'axios';

export default function userSignupRequest(userData) {
  return () => axios.post('/api/users/save', userData);
}
