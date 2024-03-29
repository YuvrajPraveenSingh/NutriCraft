import {AsyncHandaler} from '../../utils/AsyncHandaler.js'
import ApiError from "../../utils/ApiError.js";
import {Recipe} from "../../models/recipe.models.js"
import ApiResponse from "../../utils/ApiResponse.js";

const updateRecipe = AsyncHandaler(async (req , res) =>{
    res.status(200).json(
        new ApiResponse(200, _ , " recipe Updated Successfully")
    );
});
