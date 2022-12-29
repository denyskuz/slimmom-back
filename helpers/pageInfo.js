const { defaultPageSize, defaultPage } = require('./constants');

const pageInfo = ({ currentPage, pageSize }, itemsCount) => {
  let size = pageSize || defaultPageSize;
  const total = Math.ceil(itemsCount / size);
  let current = currentPage || defaultPage;
  if (current > total) {
    current = total;
  }
  if (size > itemsCount) {
    size = itemsCount;
  }
  const modulo = itemsCount % size;
  if (Number(currentPage) === total && modulo) {
    size = modulo;
  }
  return { current, size, total };
};

module.exports = pageInfo;
