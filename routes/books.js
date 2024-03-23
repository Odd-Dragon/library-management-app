const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

const { requiresAuth } = require('express-openid-connect');

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

// Middleware to require authentication for POST, PUT, and DELETE
router.use(requiresAuth());

// Routes that require authentication
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
