const express = require('express');
const router = express.Router();

const musicController = require('../controllers/music');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', musicController.getAll);

router.get('/:id', musicController.getSingle);

router.post('/', validateMusic, musicController.createMusic);

// put - include requiresAuth

// delete - include requiresAuth

module.exports = router;