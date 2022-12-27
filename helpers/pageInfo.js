const { defaultPageSize, defaultPage } = require('./constants');

const pageInfo = ({ currentPage, pageSize }, itemsCount) => {
  const size = pageSize || defaultPageSize;
  const total = Math.ceil(itemsCount / size);
  const current = currentPage || defaultPage;
  return { current, size, total };
};

module.exports = pageInfo;
