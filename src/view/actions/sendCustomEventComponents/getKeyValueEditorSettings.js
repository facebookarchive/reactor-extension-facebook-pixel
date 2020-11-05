export default ({ parameters = [] }) => {
  parameters = parameters.filter(
    (parameter) => parameter.key && parameter.value
  );

  if (parameters.length) {
    return { parameters };
  }

  return [];
};
