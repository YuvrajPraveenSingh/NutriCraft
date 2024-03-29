import ApiError from "../utils/ApiError.js";

function Pagination(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await model.countDocuments();
    const totalPages = Math.ceil(total / limit);

    let result = {};

    if (page < totalPages) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (page > 1) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      result.results = await model.find().limit(limit).skip(skip);
      res.paginatedResult = result;
      next();
    } catch (error) {
      throw new ApiError(500, "Server Error");
    }
  };
}

export default Pagination;
