const express = require('express');
const router = express.Router();

router
    .use('/', require('./swagger'))
    .use('/books', require('./books'))
    .use('/movies', require('./movies'))
    .use('/music', require('./music'))
    .use('/patrons', require('./patrons'))
    .use('/librarians', require('./librarians'))
    
module.exports = router;