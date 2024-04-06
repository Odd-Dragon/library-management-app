const express = require('express');
const router = express.Router();

const musicController = require('../controllers/music');

const { requiresAuth } = require('express-openid-connect');

router.get('/', musicController.getAll);

router.get('/:id', musicController.getSingle);

// Middleware to require authentication for POST, PUT, and DELETE
router.use(requiresAuth());

// Routes that require authentication
router.post('/', musicController.createMusic);
router.put('/:id', musicController.updateMusic);
router.delete('/:id', musicController.deleteMusic);

module.exports = router;

// Validation handling for this route is in the controller