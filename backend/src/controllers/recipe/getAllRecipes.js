import { AsyncHandaler } from "../../utils/AsyncHandaler.js";
import ApiError from "../../utils/ApiError.js";
import { Recipe } from "../../models/recipe.models.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { HTTP_STATUS } from "../../constants.js";


const getAllRecipes = AsyncHandaler(async (req, res) => {
  try {
    const safePaginatedResult = JSON.parse(JSON.stringify(res.paginatedResult));
    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          safePaginatedResult,
          "All recipes fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Failed to fetch ALL recipes: ${error.message}`
    );
  }
});
export { getAllRecipes };

