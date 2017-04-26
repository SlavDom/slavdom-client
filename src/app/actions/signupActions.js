import axios from 'axios';

export function userSignupRequest(userData) {
  return () => axios.post('/api/users/save', userData);
}

export function isUsernameExists(identifier) {
  return () => axios.get(`/api/users/username/${identifier}`);
}

export function isEmailExists(identifier) {
  return () => axios.get(`/api/users/email/${identifier}`);
}
