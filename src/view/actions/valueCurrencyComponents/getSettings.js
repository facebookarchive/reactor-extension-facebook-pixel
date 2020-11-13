export default (values) => {
  const result = {};

  Object.keys(values).forEach((k) => {
    if (values[k]) {
      result[k] = values[k];
    }
  });

  return result;
};
