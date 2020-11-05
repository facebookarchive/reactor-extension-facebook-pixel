export default (values) => {
  const errors = {};

  if (!values.pixelId) {
    errors.pixelId = {
      message: 'Please specify your Facebook Pixel ID',
      type: 'required'
    };
  }

  return errors;
};
