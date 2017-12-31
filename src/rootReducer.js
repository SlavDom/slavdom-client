import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

import flashMessages from './app/reducers/flashMessages';
import languageChooser from './app/reducers/languageChooser';
import auth from './app/reducers/auth';

export default combineReducers({
  flashMessages,
  languageChooser,
  i18n: i18nReducer,
  auth,
});
