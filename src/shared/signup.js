import * as Validator from 'validator';
import * as _ from 'lodash';

export default function signupValidation(
  data, touched) {
  const errors = {};

  if (_.isUndefined(touched) || touched.usernameTouched) {
    if (Validator.isEmpty(data.username)) {
      errors.username = 'This field is required';
    } else if (!Validator.isLength(data.username, { min: 4, max: 32 })) {
      errors.username = 'Login should be in 4 and 32 symbols';
    } else if (!Validator.isAlphanumeric(data.username)) {
      errors.username = 'Login can contain only latin letters and numbers';
    }
  }

  if (_.isUndefined(touched) || touched.emailTouched) {
    if (Validator.isEmpty(data.email)) {
      errors.email = 'This field is required';
    } else if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (_.isUndefined(touched) || touched.passwordTouched) {
    if (Validator.isEmpty(data.password)) {
      errors.password = 'This field is required';
    } else if (!Validator.isAlphanumeric(data.password)) {
      errors.password = 'Password can contain only latin letters and numbers';
    } else if (!data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)) {
      errors.password = 'Password must contain at least one lowercase letter, one uppercase letter and one digit';
    } else if (!Validator.isLength(data.password, { min: 6, max: undefined })) {
      errors.password = 'Password should have more than 6 symbols';
    }
  }

  if (_.isUndefined(touched) || touched.passwordConfirmationTouched) {
    if (Validator.isEmpty(data.passwordConfirmation)) {
      errors.passwordConfirmation = 'This field is required';
    } else if (!Validator.equals(data.password, data.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords must match';
    }
  }

  if (_.isUndefined(touched) || touched.timezoneTouched) {
    if (Validator.isEmpty(data.timezone)) {
      errors.timezone = 'This field is required';
    }
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
}
