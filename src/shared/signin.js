import * as Validator from 'validator';
import * as _ from 'lodash';

export default function signinValidation(data) {
  const errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
}
