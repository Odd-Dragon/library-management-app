const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

const { requiresAuth } = require('express-openid-connect');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

// Middleware to require authentication for POST, PUT, and DELETE
router.use(requiresAuth());

// Routes that require authentication
router.post('/', moviesController.createMovie);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;