const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  type: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  quality: { type: String },
  pokemon: { type: String },
});

module.exports = mongoose.model("Recipe", recipeSchema);
