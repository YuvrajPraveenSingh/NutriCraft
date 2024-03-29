import mongoose from 'mongoose';
import { AsyncHandaler } from '../../utils/AsyncHandaler.js';
import ApiError from "../../utils/ApiError.js";
import { Recipe } from "../../models/recipe.models.js";


const search_Recipe = AsyncHandaler(async (req, res) => {
  const query = req.query.search;
  if (!query) {
    throw new ApiError(400, `Search query is required`);
  }

  try {
    const regex = new RegExp('.*' + query + '.*',);

    const recipes = await Recipe.find({
      $or: [
        { title: { $regex:regex , $options: 'i' } },
        { description: { $regex: regex , $options: 'i' } },
        { category: { $regex: regex , $options: 'i' } },
        { ingredients: { $elemMatch: { name: { $regex: regex, $options: 'i' } } } },
        { instructions: { $regex: regex, $options: 'i' } },
        { allergens: { $regex: regex, $options: 'i' } },
        { chronicDiseases: { $regex: regex, $options: 'i' } },
      ]
    });

    res.status(200).json({
      status: "success",
      data: recipes
    });
  } catch (error) {
    throw new ApiError(500, `Error searching recipes: ${error.message}`);
  }
});

export { search_Recipe };