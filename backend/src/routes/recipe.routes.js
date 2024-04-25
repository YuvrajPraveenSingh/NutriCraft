import  {Router} from 'express';
import { Create, getAll , getOne  , update ,deleteRecipe , searchrecipe  , AllergyAndDiseaseNotInclude} from '../controllers/recipe/recipe.controllers.js';
import {Recipe} from "../models/recipe.models.js"
import Pagination from '../middlewares/pagination.middlerwares.js';

const router = Router();
router.route("/create").post( Create);
router.route('/getRecipes').get( Pagination(Recipe),getAll);
router.route('/getRecipe/:id').get( getOne);
router.route('/updateRecipe/:id').put(update);
router.route('/deleteRecipe/:id').delete(deleteRecipe);
router.route('/search').get( searchrecipe)
router.route('/notInclude').get( AllergyAndDiseaseNotInclude)
export default router;