import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';

export default function login(data) {
  return () => axios.post('/api/auth', data).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
  });
}
