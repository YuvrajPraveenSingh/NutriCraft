import  {Router} from 'express';
import { Create, getAll } from '../controllers/recipe/recipe.controllers.js';
import {Recipe} from "../models/recipe.models.js"
import Pagination from '../middlewares/pagination.middlerwares.js';

const router = Router();
router.route("/create").post( Create);
router.route('/getRecipes').get( Pagination(Recipe),getAll);
router.route('/getRecipe/:id').get(getRecipe);
// router.route('/updateRecipe/:id').put(`updateRecipe`);
// router.route('/deleteRecipe/:id').delete(`deleteRecipe`);

export default router;