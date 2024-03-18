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
const createMovie = async (req, res) => {
    try {
         // Check if title, genre and length are provided in the request body
         if (!req.body.title || !req.body.genre || !req.body.length) {
            return res.status(400).json({ error: 'Title, genre and length are required fields' });
        }

        // Check if title and genre are strings and length is a number
        if (typeof req.body.title !== 'string' || typeof req.body.genre !== 'string' || typeof req.body.length !== 'number') {
            return res.status(400).json({ error: 'Title and genre must be strings and length must be a number' });
        }
        const movie = {
            title: req.body.title,
            genre: req.body.genre,
            length: req.body.length
        };  

        const response = await mongodb.getDb().db().collection('Movies').insertOne(movie);

        if (response.acknowledged) {
            res.status(200).json();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the movie.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// put
const updateMovie = async (req, res, next) => {
    try {
      const objectId = new ObjectId(req.params.id);
      const movie = {
        title : req.body.title,
        genre : req.body.genre,
        length : req.body.length
      };
      const response = await mongodb.getDb().db().collection('Movies').replaceOne({ _id: objectId }, movie);
      if (response.acknowledged) {
        res.status(204).json(response);
      } else {
        res.status(500).json(response.error || 'Error occurred while updating movie.');
      };
    } catch (error) {
      console.error(error);
    }
}

// delete
const deleteMovie = async (req, res) => {
    try {
        // Validate movieId
        const movieId = req.params.id;
        if (!ObjectId.isValid(movieId)) {
            return res.status(400).json({ error: 'Invalid movie ID '});
        }
        // Convert movieId to ObjectId
        const objectId = new ObjectId(movieId);

        // Delete the movie from the database
        const response = await mongodb.getDb().db().collection('Movies').deleteOne({ _id:objectId });

        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: 'Movie not found '});
        }
    } catch (error) {
        console.error("Error occured while deleting movie", error);
        res.status(500).json({ error: "Internal server error "});
    }
}

module.exports = {
    getAll, 
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
}