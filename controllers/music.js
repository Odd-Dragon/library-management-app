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

// put

// delete

module.exports = {     // add rest of function names
    getAll, 
    getSingle
}