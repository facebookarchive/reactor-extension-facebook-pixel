export default (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = {
      message: 'Please provide an event name',
      type: 'required'
    };
  }

  return errors;
};
