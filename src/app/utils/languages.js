function getLang(e) {
  let res = '';
  switch (e) {
    case 'en': res = 'English';
      break;
    case 'nsl': res = 'Новословница';
      break;
    case 'is': res = 'Interslavic';
      break;
    default: break;
  }
  return res;
}

export default {
  getLang,
};

