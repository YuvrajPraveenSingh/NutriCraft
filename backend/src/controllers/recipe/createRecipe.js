import {AsyncHandaler} from '../../utils/AsyncHandaler.js'
import ApiError from "../../utils/ApiError.js";
import {Recipe} from "../../models/recipe.models.js"
import ApiResponse from "../../utils/ApiResponse.js";


const allowedCategories = ['General', 'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free'];


const createRecipe =  AsyncHandaler(async (req , res) =>{
   const {title, description , category, ingredients, instructions, allergens =[], chronicDiseases =[]} = req.body;

   if( [title, description].some((field) => field === undefined || field?.trim() === "")){
      throw new ApiError(400 ,"title & description fields are required");
   } 

   if([category, ingredients, instructions].some((field) => field === undefined)){
      throw new ApiError(400 ,"category, ingredients, instructions fields are required");
   }

   if (!Array.isArray(category) || category.some(cat => !allowedCategories.includes(cat))) {
      throw new ApiError(400, "Category must be a non-empty array with values from: " + allowedCategories.join(", "));
  }

   if (allergens && (!Array.isArray(allergens) || allergens?.some(item => typeof item !== 'string'))) {
      throw new ApiError(400, "Allergens must be an array of strings");
  }

  if (chronicDiseases && (!Array.isArray(chronicDiseases) || chronicDiseases?.some(item => typeof item !== 'string'))) {
   throw new ApiError(400, "chronicDiseases must be an array of strings");
}

   if (!Array.isArray(ingredients) || ingredients.length === 0) {
      throw new ApiError(400 ,"Ingredients must be a non-empty array");
   }

   if (!Array.isArray(instructions) || instructions.length === 0) {
      throw new ApiError(400 ,"Instructions must be a non-empty array");
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
      new ApiResponse(201, recipe , " recipe Created Successfully")
  );


})

export {createRecipe};