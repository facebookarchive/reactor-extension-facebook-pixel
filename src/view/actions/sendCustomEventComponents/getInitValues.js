export default (initInfo) => {
  const { settings } = initInfo;
  const { name = '' } = settings || {};

  return {
    name
  };
};
