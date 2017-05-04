import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error, type, onChange, onBlur }) => (
  <div className={classnames('form-group', { 'has-error': error })}>
    <label className="control-label" htmlFor="signup_username">{label}</label>
    <input
      id="signup_username"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      name={field}
      className="form-control"
    />
    {error && <span className="help-block">{error}</span>}
  </div>
);

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

TextFieldGroup.defaultProps = {
  type: 'text',
  error: '',
  onBlur: () => {},
};

export default TextFieldGroup;
