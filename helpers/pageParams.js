const pageParams = ({ currentPage, pageSize }) => {
  const page = currentPage || 1;
  const limit = pageSize || 20;
  const skip = (page - 1) * limit;
  return { skip, limit };
};

module.exports = pageParams;
