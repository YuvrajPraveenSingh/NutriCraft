import { createRecipe } from "./createRecipe.js";
import { getAllRecipes } from "./getAllRecipes.js";
import { getOneRecipe } from "./getOneRecipe.js";
import { updateRecipe } from "./updateRecipe.js";

const Create = createRecipe;
// const update = "updateRecipe";
const  getAll = getAllRecipes;
const getOne = getOneRecipe;
const updateRecipe = updateRecipe;

export { Create  , getAll , getOne , updateRecipe};
