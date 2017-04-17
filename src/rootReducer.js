import { combineReducers } from 'redux';

import flashMessages from './app/reducers/flashMessages';
import languageChooser from './app/reducers/languageChooser';
import loginChanger from './app/reducers/loginChanger';

export default combineReducers({
  flashMessages,
  languageChooser,
  loginChanger,
});
