const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

// const { requiresAuth } = require('express-openid-connect');  // wait until add Auth0

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post('/', booksController.createBook);
              // post - include requiresAuth

router.put('/:id', booksController.updateBook);
              // put - include requiresAuth

router.delete('/:id', booksController.deleteBook);
              // delete - include requiresAuth

module.exports = router;