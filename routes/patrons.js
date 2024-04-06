const express = require('express');
const router = express.Router();

const patronsController = require('../controllers/patrons');

const { requiresAuth } = require('express-openid-connect');  

router.get('/', patronsController.getAll);

router.get('/:id', patronsController.getSingle);

// Middleware to require authentication for POST, PUT, and DELETE
router.use(requiresAuth());

// Routes that require authentication
router.post('/', patronsController.createPatron);
router.put('/:id', patronsController.updatePatron);
router.delete('/:id', patronsController.deletePatron);

module.exports = router;

// Validation handling for this route is in the controller