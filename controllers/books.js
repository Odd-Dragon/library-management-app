const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const booksCursor = await mongodb.getDb().db().collection('books').find();

        // Convert cursor to array using toArray() method
        const booksArray = await booksCursor.toArray();

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
        const book = await mongodb.getDb().db().collection('books').findOne({ _id: objectId });

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

// put

// delete

module.exports = {     // add rest of function names
    getAll, 
    getSingle
}