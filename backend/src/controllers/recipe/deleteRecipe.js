import mongoose from 'mongoose';
import { AsyncHandaler } from '../../utils/AsyncHandaler.js';
import ApiError from "../../utils/ApiError.js";
import { Recipe } from "../../models/recipe.models.js";


const delete_Recipe = AsyncHandaler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid id: ${id}`);
  }

  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      throw new ApiError(404, `No recipe found with id: ${id}`);
    }

    res.status(200).json({
      status: "success",
      message: "Recipe deleted successfully"
    });
  } catch (error) {
    throw new ApiError(500, `Error deleting recipe: ${error.message}`);
  }
});

export { delete_Recipe };