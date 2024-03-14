const express = require('express');
const router = express.Router();

const books = require('../controllers/books');
const movies = require('../controllers/movies');
const music = require('../controllers/music');
const patrons = require('../controllers/patrons');

router
    .get('/books', books.getAll)
    .get('/movies', movies.getAll)
    .get('/music', music.getAll)
    .get('/patrons', patrons.getAll);

module.exports = router;