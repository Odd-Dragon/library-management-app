const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

// post - include requiresAuth

// put - include requiresAuth

// delete - include requiresAuth

module.exports = router;