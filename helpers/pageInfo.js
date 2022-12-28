const { defaultPageSize, defaultPage } = require('./constants');

const pageInfo = ({ currentPage, pageSize }, itemsCount) => {
  let size = pageSize || defaultPageSize;
  const total = Math.ceil(itemsCount / size);
  const current = currentPage || defaultPage;
  const modulo = itemsCount % size;
  if (Number(currentPage) === total && modulo) {
    size = modulo;
  }
  return { current, size, total };
};

module.exports = pageInfo;
