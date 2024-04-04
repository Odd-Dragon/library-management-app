const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('CRUD Operations', () => {
  let connection;
  let db;
  let movies;
  let insertedIds = []; // Array to store inserted document IDs

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {});
    db = connection.db();
    movies = db.collection('Movies');
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    // Delete only the documents that were inserted during the test
    for (const id of insertedIds) {
      await movies.deleteOne({ _id: id });
    }
    insertedIds = []; // Clear the array after deletion
  });

  it('should insert a doc into collection named movies', async () => {
    const mockMovie = {
      id: '12345',
      title: 'Watching',
      genre: 'Comedy',
      length: 1,
    };

    const result = await movies.insertOne(mockMovie);
    insertedIds.push(result.insertedId); // Store the inserted ID

    const insertedMovie = await movies.findOne({ _id: result.insertedId });
    expect(insertedMovie).toEqual(mockMovie);
  });

  it('should update a doc in collection named movies', async () => {
    const mockMovie = {
      id: '12345',
      title: 'Watching',
      genre: 'Comedy',
      length: 1,
    };

    const insertResult = await movies.insertOne(mockMovie);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Update the length for the mock movie
    const updateResult = await movies.updateOne(
      { _id: insertResult.insertedId },
      { $set: { length: 2 } }
    );

    expect(updateResult.modifiedCount).toBe(1);

    // Retrieve the updated movie from the database
    const updatedMovie = await movies.findOne({ _id: insertResult.insertedId });

    // Expected movie after update, including the _id
    const expectedMovie = {
      _id: insertResult.insertedId,
      id: '12345',
      title: 'Watching',
      genre: 'Comedy',
      length: 2,
    };

    expect(updatedMovie).toEqual(expectedMovie);
  });

  it('should delete a doc from the movies collection', async () => {
    const mockMovie = {
      id: '12345',
      title: 'Watching',
      genre: 'Comedy',
      length: 2,
    };

    const insertResult = await movies.insertOne(mockMovie);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Delete the inserted movie
    const deleteResult = await movies.deleteOne({ _id: insertResult.insertedId });

    expect(deleteResult.deletedCount).toBe(1);

    // Check if the movie is no longer in the database
    const deletedMovie = await movies.findOne({ _id: insertResult.insertedId });
    expect(deletedMovie).toBeNull();
  });

  it('should retrieve a doc from the movies collection', async () => {
    const mockMovie = {
      id: '12345',
      title: 'Watching',
      genre: 'Comedy',
      length: 2,
    };

    const insertResult = await movies.insertOne(mockMovie);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Retrieve the inserted movie
    const retrievedMovie = await movies.findOne({ _id: insertResult.insertedId });

    expect(retrievedMovie).toEqual(mockMovie);
  });
});