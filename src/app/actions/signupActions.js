import axios from 'axios';

export default function userSignupRequest(userData) {
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    axios.get('/api/translations/list');
    axios.post('/api/users', userData);
  };
}
