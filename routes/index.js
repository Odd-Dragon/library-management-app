const express = require('express');
const router = express.Router();

router
    .use('/', require('./swagger'))
    .use('/books', require('./books'))
    .use('/movies', require('./movies'))
    .use('/music', require('./music'))
    .use('/patrons', require('./patrons'));

    module.exports = router;