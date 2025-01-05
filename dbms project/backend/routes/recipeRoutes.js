const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const router = express.Router();

// Get All Recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'name');
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create Recipe
router.post('/', auth, async (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      createdBy: req.user.id
    });

    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
