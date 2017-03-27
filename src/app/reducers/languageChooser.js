import { ENGLISH_CHOOSER, INTERSLAVIC_CHOOSER, NOVOSLOVNICA_CHOOSER, SET_CHOOSER } from '../actions/types';

export default (state = 'en', action = {}) => {
  switch (action.type) {
    case SET_CHOOSER:
      return action.payload;
    case ENGLISH_CHOOSER:
      return 'en';
    case INTERSLAVIC_CHOOSER:
      return 'is';
    case NOVOSLOVNICA_CHOOSER:
      return 'nsl';
    default:
      return state;
  }
};
