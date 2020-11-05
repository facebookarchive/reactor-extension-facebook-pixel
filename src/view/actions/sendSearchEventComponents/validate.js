export default (values) => {
  const errors = {};

  if (!values.searchString) {
    errors.searchString = {
      message: 'Please specify a search string',
      type: 'required'
    };
  }

  return errors;
};
