import { HTTP_STATUS } from "../../constants.js";
import { Recipe } from "../../models/recipe.models.js";
import ApiError from "../../utils/ApiError.js";
import { AsyncHandaler } from "../../utils/AsyncHandaler.js";
import mongoose from "mongoose";

 const getOneRecipe = AsyncHandaler(async (req, res, next) => {
   const id = req.params.id;
   if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid id: ${id}`);
  }
   
   try {
     const recipe = await Recipe.findById(id);
     if(!recipe){
       throw new ApiError(404, `No recipe found with id : ${id}`);
     }

     res.status(HTTP_STATUS.OK).json({
       status: "success",
       data: recipe,
     });

    

   } catch (error) {
     throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ` error in getOneRecipe : ${error.message}`);
   }
 });
 export { getOneRecipe };