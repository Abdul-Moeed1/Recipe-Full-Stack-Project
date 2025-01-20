const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    ingredients: {
        type: [String],  // Array of strings for ingredients
        required: true   // Ingredients are required
    },
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

