export default (initInfo) => {
  const { settings } = initInfo;
  const { value = '', currency = '' } = settings || {};

  return {
    value,
    currency
  };
};
