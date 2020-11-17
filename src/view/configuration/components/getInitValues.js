export default (initInfo) => {
  const { settings } = initInfo;
  const { pixelId = '', ldu } = settings || {};

  const initValues = {
    pixelId
  };

  if (ldu) {
    initValues.lduEnabled = true;
    initValues.lduOption = ldu;
  } else {
    initValues.lduEnabled = false;
    initValues.lduOption = 'auto';
  }

  return initValues;
};
