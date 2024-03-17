const express = require('express');
const router = express.Router();

const patronsController = require('../controllers/patrons');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', patronsController.getAll);

router.get('/:id', patronsController.getSingle);

router.post('/', patronsController.createPatron);
            // post - include requiresAuth

router.put('/:id', patronsController.updatePatron);
            // put - include requiresAuth

router.delete('/:id', patronsController.deletePatron);
            // delete - include requiresAuth

module.exports = router;