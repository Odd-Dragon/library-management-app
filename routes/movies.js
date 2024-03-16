const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', validateMovie, moviesController.createMovie);

// put - include requiresAuth

// delete - include requiresAuth

module.exports = router;