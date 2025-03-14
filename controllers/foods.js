const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Index Route
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', { user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// New Route
router.get('/new', (req, res) => {
  res.render('foods/new.ejs', { userId: req.session.user._id });
});

// Create Route
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${req.session.user._id}/pantry`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Show Route
router.get('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.foodId);
    res.render('foods/show.ejs', { food, userId: req.session.user._id });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Edit Route
router.get('/:foodId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', { food, userId: req.session.user._id });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// controllers/foods.js

// Update Route - Update an item in the pantry
router.put('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.foodId);
    food.set(req.body);
    await user.save();
    res.redirect(`/users/${req.session.user._id}/pantry`);
  } catch (err) {
    console.error("Error updating food item:", err);
    res.redirect('/');
  }
});
// Delete Route
router.delete('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.id(req.params.foodId).deleteOne();
    await user.save();
    res.redirect(`/users/${req.session.user._id}/pantry`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;