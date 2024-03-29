import { createRecipe } from "./createRecipe.js";
import { getAllRecipes } from "./getAllRecipes.js";
import { getOneRecipe } from "./getOneRecipe.js";
import { delete_Recipe } from "./deleteRecipe.js";
import { update_Recipe } from "./updateRecipe.js";
import { search_Recipe } from "./searchrecipe.js";


const Create = createRecipe;
const update = update_Recipe;
const  getAll = getAllRecipes;
const getOne = getOneRecipe;
const deleteRecipe = delete_Recipe;
const searchrecipe = search_Recipe;

export { Create  , getAll , getOne , deleteRecipe , update , searchrecipe};
