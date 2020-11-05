export default (initInfo) => {
  const { settings } = initInfo;
  const { pixelId = '' } = settings || {};

  return {
    pixelId
  };
};
