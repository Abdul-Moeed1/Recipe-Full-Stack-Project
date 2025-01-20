const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
   email:{
        type:email,
        required: true
   }
    recipe:{
        type:String,
        required: true
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Snack'], // Example categories
        required: true   // Category is required
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

