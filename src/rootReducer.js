import { combineReducers } from 'redux';

import flashMessages from './app/reducers/flashMessages';
import languageChooser from './app/reducers/languageChooser';

export default combineReducers({
  flashMessages,
  languageChooser,
});
