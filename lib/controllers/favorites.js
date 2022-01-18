const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const FavoriteCampground = require('../models/Favorites');

module.exports = Router ()
  .post('/addfavorite', ensureAuth, async (req, res, next) => {
    try {
      const newFavoriteCampGround = await FavoriteCampground.createFavorite({ userId: req.user.email, ...req.body });
      res.send(newFavoriteCampGround);
    } catch (error) {
      next(error);
    }
  });