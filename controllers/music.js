const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const musicsCursor = await mongodb.getDb().db().collection('musics').find();

        // Convert cursor to array using toArray() method
        const musicsArray = await musicsCursor.toArray();

        // Send response with the array of books
        res.status(200).json(musicsArray);
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
        const music = await mongodb.getDb().db().collection('musics').findOne({ _id: objectId });

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

const createMusic = async (req, res) => {
    try {
        const music = {
            _id: req.body.id,
            song_title: req.body.song_title,
            album_title: req.body.album_title,
            length: req.body.length
        };  

        const response = await mongodb.getDb().db().collection('musics').insertOne(music);

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

// delete

module.exports = {     // add rest of function names
    getAll, 
    getSingle,
    createMusic,
    deleteMusic,
}