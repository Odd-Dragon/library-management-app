const express = require('express');
const router = express.Router();

const musicController = require('../controllers/music');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', musicController.getAll);

router.get('/:id', musicController.getSingle);

router.post('/', musicController.createMusic);
            // post - include requiresAuth

router.put('/:id', musicController.updateMusic);
            // put - include requiresAuth

router.delete('/:id', musicController.deleteMusic);
            // delete - include requiresAuth

module.exports = router;