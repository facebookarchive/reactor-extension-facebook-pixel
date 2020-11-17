export default ({ pixelId, lduEnabled, lduOption }) => {
  const result = {
    pixelId
  };

  if (lduEnabled) {
    result.ldu = lduOption;
  }

  return result;
};
