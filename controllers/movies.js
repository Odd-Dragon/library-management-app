const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const moviesCollection = await mongodb.getDb().db().collection('Movies').find();

        // Convert cursor to array using toArray() method
        const moviesArray = await moviesCollection.toArray();

        // Send response with the array of movies
        res.status(200).json(moviesArray);
    } catch (error) {
        // Handle error
        console.error("Error occured while retrieving movies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSingle = async (req, res) => {
    try {
        const movieId = req.params.id;

        // Validate movieId
        if (!ObjectId.isValid(movieId)) {
            return res.status(400).json({ error: 'Invalid movie ID' });
        }

        // Convert movieId to ObjectId
        const objectId = new ObjectId(movieId);

        // Find book by _id
        const movie = await mongodb.getDb().db().collection('Movies').findOne({ _id: objectId });

        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error("Error occured while retrieving movie:", error);
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