const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const booksCollection = await mongodb.getDb().db().collection('Books').find();

        // Convert cursor to array using toArray() method
        const booksArray = await booksCollection.toArray();

        // Send response with the array of books
        res.status(200).json(booksArray);
    } catch (error) {
        // Handle error
        console.error("Error occured while retrieving books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSingle = async (req, res) => {
    try {
        const bookId = req.params.id;

        // Validate bookId
        if (!ObjectId.isValid(bookId)) {
            return res.status(400).json({ error: 'Invalid book ID' });
        }

        // Convert bookId to ObjectId
        const objectId = new ObjectId(bookId);

        // Find book by _id
        const book = await mongodb.getDb().db().collection('Books').findOne({ _id: objectId });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error("Error occured while retrieving book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// post
const createBook = async (req, res) => {
    try {
         // Check if title, author and pages are provided in the request body
         if (!req.body.title || !req.body.author || !req.body.pages) {
            return res.status(400).json({ error: 'Title, author and pages are required fields' });
        }

        // Check if title and author are strings and pages is a number
        if (typeof req.body.title !== 'string' || typeof req.body.author !== 'string' || typeof req.body.pages !== 'number') {
            return res.status(400).json({ error: 'Title and author must be strings and pages must be a number' });
        }

        const book = {
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages
        };  

        const response = await mongodb.getDb().db().collection('Books').insertOne(book);

        if (response.acknowledged) {
            res.status(200).json();
        } else {
            res.status(500).json(response.error || "Error occurred while creating the book.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// put
const updateBook = async (req, res, next) => {
    try {
      const objectId = new ObjectId(req.params.id);
      const book = {
        title : req.body.title,
        author : req.body.author,
        pages : req.body.pages
      };
      const response = await mongodb.getDb().db().collection('Books').replaceOne({ _id: objectId }, book);
      if (response.acknowledged) {
        res.status(204).json(response);
      } else {
        res.status(500).json(response.error || 'Error occurred while updating book.');
      };
    } catch (error) {
      console.error(error);
    }
}

// delete
const deleteBook = async (req, res) => {
    try {
        // Validate bookId
        const bookId = req.params.id;
        if (!ObjectId.isValid(bookId)) {
            return res.status(400).json({ error: 'Invalid book ID '});
        }
        // Convert bookId to ObjectId
        const objectId = new ObjectId(bookId);

        // Delete the book from the database
        const response = await mongodb.getDb().db().collection('Books').deleteOne({ _id:objectId });

        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: 'Book not found '});
        }
    } catch (error) {
        console.error("Error occured while deleting book", error);
        res.status(500).json({ error: "Internal server error "});
    }
}

module.exports = {
    getAll, 
    getSingle, 
    createBook,
    updateBook,
    deleteBook
}