const { defaultPageSize, defaultPage } = require('./constants');

const pageParams = ({ currentPage, pageSize }) => {
  const page = currentPage || defaultPage;
  const limit = pageSize || defaultPageSize;
  const skip = (page - 1) * limit;
  return { skip, limit };
};

module.exports = pageParams;
