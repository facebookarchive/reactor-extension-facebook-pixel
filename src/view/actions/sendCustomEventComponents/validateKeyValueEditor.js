export default (values) => {
  const errors = {};
  const configuredParameters = [];

  (values.parameters || []).forEach((parameter, index) => {
    if (parameter.key && !parameter.value) {
      errors[`parameters[${index}][value]`] = {
        message: 'Please provide a value',
        type: 'required'
      };
    } else if (!parameter.key && parameter.value) {
      errors[`parameters[${index}][key]`] = {
        message: 'Please provide a key',
        type: 'required'
      };
    }

    if (configuredParameters.indexOf(parameter.key) !== -1) {
      errors[`parameters[${index}][key]`] = {
        message: `Key ${parameter.key} is already configured`,
        type: 'duplicated'
      };
    } else if (parameter.key) {
      configuredParameters.push(parameter.key);
    }
  });

  return errors;
};
