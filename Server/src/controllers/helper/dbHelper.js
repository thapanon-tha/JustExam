const db = require('../../models/db');

module.exports = async (req, serviceCallback, extraOption = {}) => {
  const DEFAULT_LIMIT_SIZE = 20;

  const page = req.query.page >= 1 ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit >= 1 ? parseInt(req.query.limit, 10) : DEFAULT_LIMIT_SIZE;
  const offset = (page - 1) * limit;
  const orderCol = req.query.orderCol || '';
  const orderDir = req.query.orderDir === 'DESC' ? 'DESC' : 'ASC';
  const search = req.query.search || '';

  const queryParams = {
    offset, limit, search, reqParams: req.query,
  };
  if (orderCol) queryParams.order = db.sequelize.literal(`${orderCol} ${orderDir}`);

  let result = await serviceCallback(queryParams, extraOption);
  if (Array.isArray(result.rows)) {
    const count = Array.isArray(result.count) ? result.count.length : result.count;
    result = {
      totalRows: count,
      currentPage: page,
      totalPage: Math.ceil(count / limit),
      rows: result.rows,
    };
  }

  return result;
};
