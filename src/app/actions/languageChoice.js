import { SET_CHOOSER, ENGLISH_CHOOSER, NOVOSLOVNICA_CHOOSER, INTERSLAVIC_CHOOSER } from './types';

export const set = value => ({
  type: SET_CHOOSER,
  payload: value,
});

export const toEnglish = () => ({
  type: ENGLISH_CHOOSER,
});

export const toNovoslovnica = () => ({
  type: NOVOSLOVNICA_CHOOSER,
});

export const toInterslavic = () => ({
  type: INTERSLAVIC_CHOOSER,
});
