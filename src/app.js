const express = require("express");
require("../db/conn")
const path = require("path");
var hbs = require('hbs');
const port = process.env.PORT || 3000;
const app = express();
const Recipe = require("../models/recipes");

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,"../templates/views" )); 
hbs.registerPartials(path.join(__dirname,"../templates/partials" ));

console.log(path.join(__dirname, '../public'));


app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/postRecipe",(req,res)=>{
    res.render("postRecipe");
});


app.post("/postRecipe", async (req, res) => {
    const { title, ingredients, recipe, category } = req.body;

    const ingredientsArray = ingredients.split(',').map(item => item.trim());

    // Log the values to check
    console.log('Title:', title);
    console.log('Ingredients:', ingredients);
    console.log('Recipe Instructions:', recipe);
    console.log('Category:', category);

    try {
        const newRecipe = new Recipe({
            title,
            ingredients: ingredientsArray, // Ingredients will be an array from the form input
            recipe,
            category
        });

        await newRecipe.save();
        console.log("Recipe created successfully")
        res.status(201).render("postRecipe",{ message: 'Recipe created successfully!' });
    } catch (error) {
        console.log(error);
        res.render('index', { message: 'Error creating recipe: ' + error.message });
    }
});

app.get("/findRecipes", async(req,res)=>{
    try {
        const recipesData = await Recipe.find();
        console.log(recipesData);
        res.render("findRecipes", { recipesData });
    } catch (error) {
        res.send(error);
    }

});
app.get("/findRecipe/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const recipe = await Recipe.findById(_id);
        console.log(recipe);
        //res.send(recipe);
         res.render("Recipe", {recipe});
    } catch (error) {
        res.send(error);
    }

});

app.listen( port,()=>{
    console.log(`Live at Port no: ${port}`);
});