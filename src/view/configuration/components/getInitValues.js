export default (initInfo) => {
  const { settings } = initInfo;
  const { pixelId = '', eventId = '' } = settings || {};

  return {
    pixelId,
    eventId
  };
};
