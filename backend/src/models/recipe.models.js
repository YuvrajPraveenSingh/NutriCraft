import mongoose , {Schema} from "mongoose";

const recipeSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim: true,
        maxlength: 100

    },
    description:{
        type:String,
        required:true,
        trim: true
    },
    category:{
        type:[String],
        required:true,
        enum: ['General', 'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free'],
        default: ["General"]
    },
    ingredients:{
        type:[Object],
        required:true,
        default: [{name:"",quantity:""}]
    },
    instructions:{
        type:[String],
        required:true,
        default: []
    },
    allergens:{
        type:[String],
        default: []

    },
    chronicDiseases:{
        type:[String],
        default: []
    },


    image:{
        type:String,
        required:true,
        default: "https://res.cloudinary.com/dzexxvvzc/image/upload/v1710920643/samples/food/spices.jpg"
    },
},{timestamps:true});

export const Recipe = mongoose.model("Recipe",recipeSchema);
