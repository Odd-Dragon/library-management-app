const express = require('express');
const router = express.Router();

const librariansController = require('../controllers/librarians');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', librariansController.getAll);

router.get('/:id', librariansController.getSingle);

// router.post('/', librariansController.createPatron);
//             // post - include requiresAuth

// router.put('/:id', librariansController.updatePatron);
            // put - include requiresAuth

// delete - include requiresAuth

module.exports = router;