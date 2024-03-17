const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const librariansCollection = await mongodb.getDb().db().collection('librarians').find();

        // Convert cursor to array using toArray() method
        const librariansArray = await librariansCollection.toArray();

        // Send response with the array of librarians
        res.status(200).json(librariansArray);
    } catch (error) {
        // Handle error
        console.error("Error occured while retrieving librarian:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSingle = async (req, res) => {
    try {
        const librarianId = req.params.id;

        // Validate librarianId
        if (!ObjectId.isValid(librarianId)) {
            return res.status(400).json({ error: 'Invalid librarian ID' });
        }

        // Convert librarianId to ObjectId
        const objectId = new ObjectId(librarianId);

        // Find librarian by _id
        const librarian = await mongodb.getDb().db().collection('librarians').findOne({ _id: objectId });

        if (librarian) {
            res.status(200).json(librarian);
        } else {
            res.status(404).json({ error: 'librarian not found' });
        }
    } catch (error) {
        console.error("Error occured while retrieving librarian:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// post
const createlibrarian = async (req, res) => {
    try {
        // Check if first and last name, email and address are provided in the request body
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.address) {
            return res.status(400).json({ error: 'First and last name, email, and address are required fields' });
        }

        // Check if first and last name, email, and address are strings
        if (typeof req.body.first_name !== 'string' || typeof req.body.last_name !== 'string' || typeof req.body.email !== 'string' || typeof req.body.address !== 'string') {
            return res.status(400).json({ error: 'First and last name, email, and address must be strings' });
        }
        const librarian = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address
        };  

        const response = await mongodb.getDb().db().collection('librarians').insertOne(librarian);

        if (response.acknowledged) {
            res.status(200).json();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the librarian.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// put
const updatelibrarian = async (req, res, next) => {
    try {
      const librarianId = req.params.id;

      // Validate librarianId
      if (!ObjectId.isValid(librarianId)) {
        return res.status(400).json({ error: 'Invalid librarian ID' });
    }

      const objectId = new ObjectId(librarianId);

      const librarian = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        address : req.body.address
      };
      const response = await mongodb.getDb().db().collection('librarians').replaceOne({ _id: objectId }, librarian);
      if (response.acknowledged) {
        res.status(204).json(response);
      } else {
        res.status(500).json(response.error || 'Error occurred while updating librarian.');
      };
    } catch (error) {
      console.error(error);
    }
}

// delete

module.exports = {     // add rest of function names
    getAll, 
    getSingle,
    createlibrarian,
    updatelibrarian,
    
}