const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const patronsCursor = await mongodb.getDb().db().collection('patrons').find();

        // Convert cursor to array using toArray() method
        const patronsArray = await patronsCursor.toArray();

        // Send response with the array of patrons
        res.status(200).json(patronsArray);
    } catch (error) {
        // Handle error
        console.error("Error occured while retrieving patron:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSingle = async (req, res) => {
    try {
        const patronId = req.params.id;

        // Validate patronId
        if (!ObjectId.isValid(patronId)) {
            return res.status(400).json({ error: 'Invalid patron ID' });
        }

        // Convert patronId to ObjectId
        const objectId = new ObjectId(patronId);

        // Find patron by _id
        const patron = await mongodb.getDb().db().collection('patrons').findOne({ _id: objectId });

        if (patron) {
            res.status(200).json(patron);
        } else {
            res.status(404).json({ error: 'Patron not found' });
        }
    } catch (error) {
        console.error("Error occured while retrieving patron:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createPatron = async (req, res) => {
    try {
        const patron = {
            _id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address
        };  

        const response = await mongodb.getDb().db().collection('patrons').insertOne(patron);

        if (response.acknowledged) {
            res.status(200).json();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the patron.');
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
    createPatron,
    deletePatron,
}