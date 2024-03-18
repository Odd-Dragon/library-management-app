const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.createMovie);
            // post - include requiresAuth

router.put('/:id', moviesController.updateMovie);
            // put - include requiresAuth

router.delete('/:id', moviesController.deleteMovie);
            // delete - include requiresAuth

module.exports = router;