import {AsyncHandaler} from '../../utils/AsyncHandaler.js'
import ApiError from "../../utils/ApiError.js";
import {Recipe} from "../../models/recipe.models.js"
import ApiResponse from "../../utils/ApiResponse.js";

const createRecipe =  AsyncHandaler(async (req , res) =>{
   const {title, description, category, instructions, allergens , chronicDiseases} = req.body;
   if( [title, description, ingredients, instructions ].some((field) => field === undefined || field?.trim() === "")){
      throw new ApiError(400 ,"All fields are required");
    } 

   const recipe = await Recipe.create({
      title,
      description,
      category,
      ingredients,
      instructions,
      allergens,
      chronicDiseases
   });

   res.status(201).json(
      new ApiResponse(201, CreatedUser, "User Created Successfully")
  );


})

export {createRecipe};