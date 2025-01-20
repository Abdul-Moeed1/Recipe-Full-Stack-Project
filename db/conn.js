const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/InstaRecipe").then(() => {
    console.log('Connected to MongoDB successfully!');
})
.catch((err) => {
    console.log(`Can not connect to Data base and error is: ${err}`);
});