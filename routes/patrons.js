const express = require('express');
const router = express.Router();

const patronsController = require('../controllers/patrons');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', patronsController.getAll);

router.get('/:id', patronsController.getSingle);

router.post('/', validatePatron, patronsController.createPatron);

// put - include requiresAuth

// delete - include requiresAuth

module.exports = router;