export default (initInfo) => {
  const { settings } = initInfo;
  const { parameters } = settings || {};

  if (!parameters || parameters.length === 0) {
    return {
      parameters: [{ key: '', value: '' }]
    };
  }

  return {
    parameters
  };
};
