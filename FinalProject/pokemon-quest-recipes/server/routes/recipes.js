const express = require("express");
const Recipe = require("../models/recipe");
const {
  recipeTypes,
  ingredients,
  qualities,
} = require("../models/constants.json");

const router = express.Router();

function validateRecipe(recipe) {
  if (recipe.ingredients.length < 1 || recipe.ingredients > 5) {
    return { message: "Wrong number of ingredients.", isValid: false };
  }
  if (recipe.ingredients.some((i) => !ingredients.includes(i))) {
    return { message: "Ingredient types not all valid.", isValid: false };
  }
  if (!recipeTypes.includes(recipe.type)) {
    return { message: "Recipe type not valid.", isValid: false };
  }
  if (!qualities.includes(recipe.quality)) {
    return { message: "Quality type not valid.", isValid: false };
  }
  return { isValid: true };
}

router.post("", (req, res, next) => {
  const test = validateRecipe(req.body);
  if (!test.isValid) {
    res.status(400).json({
      message: test.message,
    });
    return;
  }
  const recipe = new Recipe({
    type: req.body.type,
    ingredients: req.body.ingredients,
    quality: req.body.quality,
    pokemon: req.body.pokemon,
  });
  recipe
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Recipe added successfully!",
        recipeId: result._id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem creating the recipe.",
        error: err,
      });
    });
});

router.get("", (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json({
        message: "Recipes fetched successfully!",
        recipes: recipes.map((r) => {
          return {
            id: r._id,
            type: r.type,
            quality: r.quality,
            ingredients: r.ingredients,
            pokemon: r.pokemon,
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem fetching recipes from the database.",
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  const test = validateRecipe(req.body);
  if (!test.isValid) {
    res.status(400).json({
      message: test.message,
    });
    return;
  }
  const post = new Recipe({
    _id: req.body.id,
    type: req.body.type,
    ingredients: req.body.ingredients,
    quality: req.body.quality,
    pokemon: req.body.pokemon,
  });
  Recipe.updateOne({ _id: req.params.id }, post)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem updating the recipe.",
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (recipe) {
        res
          .status(200)
          .json({
            id: recipe._id,
            type: recipe.type,
            quality: recipe.quality,
            ingredients: recipe.ingredients,
            pokemon: recipe.pokemon,
          });
      } else {
        res.status(404).json({ message: "Recipe not found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem fetching the recipe.",
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Recipe deleted!" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem deleting the recipe.",
        error: err,
      });
    });
});

module.exports = router;
