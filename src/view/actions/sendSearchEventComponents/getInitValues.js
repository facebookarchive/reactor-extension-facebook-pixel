export default (initInfo) => {
  const { settings } = initInfo;
  const { searchString = '' } = settings || {};

  return {
    searchString
  };
};
