import { LOGGED_IN, LOGGED_OUT } from './types';

export const logIn = () => ({
  type: LOGGED_IN,
});

export const logOut = () => ({
  type: LOGGED_OUT,
});
