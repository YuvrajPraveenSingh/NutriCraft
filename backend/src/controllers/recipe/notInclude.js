import mongoose from "mongoose";
import { AsyncHandaler } from "../../utils/AsyncHandaler.js";
import ApiError from "../../utils/ApiError.js";
import { Recipe } from "../../models/recipe.models.js";


const notInclude = AsyncHandaler(async (req, res) => {
  const searchValueChronicDiseases = req.query.searchChronicDiseases || '';
  const searchValueAllergens = req.query.searchAllergens || '';
  const limit = 10;

  let recipes;

  if (!searchValueChronicDiseases && !searchValueAllergens) {
    // If both searchValueChronicDiseases and searchValueAllergens are empty, return the 10 most recent documents
    recipes = await Recipe.find()
      .sort({ _id: -1 })
      .limit(limit);
  } else if (searchValueChronicDiseases && !searchValueAllergens) {
    const chronicDiseasesTerms = searchValueChronicDiseases.split(',').map(term => new RegExp(term.trim(), 'i'));
    recipes = await Recipe.find({
      chronicDiseases: { $nin: chronicDiseasesTerms },
    });
  }
  else if (!searchValueChronicDiseases && searchValueAllergens) {
    const allergensTerms = searchValueAllergens.split(',').map(term => new RegExp(term.trim(), 'i'));
    recipes = await Recipe.find({
      allergens: { $nin: allergensTerms },
    });
  }
  else {
    const chronicDiseasesTerms = searchValueChronicDiseases.split(',').map(term => new RegExp(term.trim(), 'i'));
    const allergensTerms = searchValueAllergens.split(',').map(term => new RegExp(term.trim(), 'i'));

    recipes = await Recipe.find({
      $and: [
        { chronicDiseases: { $nin: chronicDiseasesTerms } },
        { allergens: { $nin: allergensTerms } },
      ],
    })
    
  }
  res.status(200).json({
    status: "success",
    data: recipes
  });
});

export { notInclude };
