const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Index Route
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Show Route
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('users/show.ejs', { user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;