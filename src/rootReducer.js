import { combineReducers } from 'redux';

import flashMessages from './app/reducers/flashMessages';
import languageChooser from './app/reducers/languageChooser';
import auth from './app/reducers/auth';

export default combineReducers({
  flashMessages,
  languageChooser,
  auth,
});
