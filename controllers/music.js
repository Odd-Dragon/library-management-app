const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const musicCollection = await mongodb.getDb().db().collection('Music').find();

        // Convert cursor to array using toArray() method
        const musicArray = await musicCollection.toArray();

        // Send response with the array of books
        res.status(200).json(musicArray);
    } catch (error) {
        // Handle error
        console.error("Error occured while retrieving music:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSingle = async (req, res) => {
    try {
        const musicId = req.params.id;

        // Validate musicId
        if (!ObjectId.isValid(musicId)) {
            return res.status(400).json({ error: 'Invalid music ID' });
        }

        // Convert musicId to ObjectId
        const objectId = new ObjectId(musicId);

        // Find music by _id
        const music = await mongodb.getDb().db().collection('Music').findOne({ _id: objectId });

        if (music) {
            res.status(200).json(music);
        } else {
            res.status(404).json({ error: 'Music not found' });
        }
    } catch (error) {
        console.error("Error occured while retrieving music:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// post
const createMusic = async (req, res) => {
    try {
        // Validate the song title, album title and length are provided in the request body
        if (!req.body.song_title || !req.body.album_title || !req.body.length) {
            return res.status(400).json({ error: 'Song and album titles and length are required fields' });
        }

        // Validate the song title and album title are strings and length is a number
        if (typeof req.body.song_title !== 'string' || typeof req.body.album_title !== 'string' || typeof req.body.length !== 'number') {
            return res.status(400).json({ error: 'Song and album titles must be strings and length must be a number' });
        }

        const music = {
            song_title: req.body.song_title,
            album_title: req.body.album_title,
            length: req.body.length
        };  

        const response = await mongodb.getDb().db().collection('Music').insertOne(music);

        if (response.acknowledged) {
            res.status(200).json();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the music.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// put
const updateMusic = async (req, res, next) => {
    try {
      const objectId = new ObjectId(req.params.id);
      const music = {
        song_title : req.body.song_title,
        album_title : req.body.album_title,
        length : req.body.length
      };
      const response = await mongodb.getDb().db().collection('Music').replaceOne({ _id: objectId }, music);
      if (response.acknowledged) {
        res.status(204).json(response);
      } else {
        res.status(500).json(response.error || 'Error occurred while updating music.');
      };
    } catch (error) {
      console.error(error);
    }
}

// delete
const deleteMusic = async (req, res) => {
    try {
        // Validate musicId
        const musicId = req.params.id;
        if (!ObjectId.isValid(musicId)) {
            return res.status(400).json({ error: 'Invalid music ID '});
        }
        // Convert musicId to ObjectId
        const objectId = new ObjectId(musicId);

        // Delete the music from the database
        const response = await mongodb.getDb().db().collection('Music').deleteOne({ _id:objectId });

        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: 'Music not found '});
        }
    } catch (error) {
        console.error("Error occured while deleting music", error);
        res.status(500).json({ error: "Internal server error "});
    }
}

module.exports = {
    getAll, 
    getSingle,
    createMusic,
    updateMusic,
    deleteMusic
}