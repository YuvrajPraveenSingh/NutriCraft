import mongoose , {Schema} from "mongoose";

const recipeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    ingredients:{
        type:{
            name: String,
            quantity: String
        },
        required:true
    },
    instructions:{
        type:[String],
        required:true
    },
    allergens:{
        type:[String],
    },
    chronicDiseases:{
        type:[String],
    },


    // image:{
    //     type:String,
    //     required:true
    // },
},{timestamps:true});

export const Recipe = mongoose.model("Recipe",recipeSchema);
