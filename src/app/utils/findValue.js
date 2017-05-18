import * as _ from 'lodash';

export default function findValue(name, object, string = 'You have not added such information') {
  return _.has(object, name) ? _.get(object, name) : string;
}
