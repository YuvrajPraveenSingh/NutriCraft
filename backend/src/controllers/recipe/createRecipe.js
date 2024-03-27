import {AsyncHandaler} from '../../utils/AsyncHandaler.js'
import ApiError from "../../utils/ApiError.js";
import {Recipe} from "../../models/recipe.models.js"
import ApiResponse from "../../utils/ApiResponse.js";

const createRecipe =  AsyncHandaler(async (req , res) =>{
   const {title, description} = req.body;
   if( [title, description,].some((field) => field === undefined || field?.trim() === "")){
      throw new ApiError(400 ,"All fields are required");
    } 

   const recipe = await Recipe.create({
      title,
      description,
   });

   res.status(201).json(
      new ApiResponse(201, createRecipe, "User Created Successfully")
  );


})

export {createRecipe};