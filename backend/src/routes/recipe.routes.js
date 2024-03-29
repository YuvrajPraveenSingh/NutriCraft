import  {Router} from 'express';
import { Create, getAll , getOne  , updateRecipe} from '../controllers/recipe/recipe.controllers.js';
import {Recipe} from "../models/recipe.models.js"
import Pagination from '../middlewares/pagination.middlerwares.js';

const router = Router();
router.route("/create").post( Create);
router.route('/getRecipes').get( Pagination(Recipe),getAll);
router.route('/getRecipe/:id').get( getOne);
router.route('/updateRecipe/:id').put(updateRecipe);
// router.route('/deleteRecipe/:id').delete(`deleteRecipe`);

export default router;