import axios from 'axios';

export function userSignupRequest(userData) {
  return () => axios.post('/api/users/save', userData);
}

export function isUserExists(identifier) {
  return () => axios.get(`/api/users/${identifier}`);
}
