import  {Router} from 'express';
import { Create } from '../controllers/recipe/recipe.controllers.js';
// import {createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe} from '../controllers/recipe.controller.js';


const router = Router();
router.route('/create').post( Create);
// router.route('/getRecipes').get(`getRecipes`);
// router.route('/getRecipe/:id').get(`getRecipe`);
// router.route('/updateRecipe/:id').put(`updateRecipe`);
// router.route('/deleteRecipe/:id').delete(`deleteRecipe`);

export default router;