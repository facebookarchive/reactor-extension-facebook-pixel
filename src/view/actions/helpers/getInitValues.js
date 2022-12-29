/* eslint-disable camelcase */
export default (initInfo) => {
  const { settings } = initInfo;
  const {
    value = '',
    currency = '',
    content_category = '',
    content_ids = '',
    content_name = '',
    contents = '',
    num_items = '',
    status = ''
  } = settings || {};
  return {
    value,
    currency,
    content_category,
    content_ids,
    content_name,
    contents,
    num_items,
    status
  };
};
