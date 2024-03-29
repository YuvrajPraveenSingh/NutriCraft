import mongoose from 'mongoose';
import { AsyncHandaler } from '../../utils/AsyncHandaler.js';
import ApiError from "../../utils/ApiError.js";
import { Recipe } from "../../models/recipe.models.js";

const update_Recipe = AsyncHandaler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, `Invalid id: ${id}`);
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'category', 'ingredients', 'instructions', 'allergens', 'chronicDiseases', 'image'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new ApiError(400, 'Invalid updates!');
    }

    try {
        const recipe = await Recipe.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!recipe) {
            throw new ApiError(404, `No recipe found with id: ${id}`);
        }

        res.status(200).json({
            status: "success",
            data: recipe
        });
    } catch (error) {
        throw new ApiError(500, `Error updating recipe: ${error.message}`);
    }
});

export { update_Recipe };