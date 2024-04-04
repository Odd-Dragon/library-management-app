const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('CRUD Operations', () => {
  let connection;
  let db;
  let books;
  let insertedIds = []; // Array to store inserted document IDs

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {});
    db = connection.db();
    books = db.collection('Books');
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    // Delete only the documents that were inserted during the test
    for (const id of insertedIds) {
      await books.deleteOne({ _id: id });
    }
    insertedIds = []; // Clear the array after deletion
  });

  it('should insert a doc into collection named books', async () => {
    const mockBook = {
      id: '1234',
      title: 'Writings',
      author: 'Writer Wannabe',
      pages: 200,
    };

    const result = await books.insertOne(mockBook);
    insertedIds.push(result.insertedId); // Store the inserted ID

    const insertedBook = await books.findOne({ _id: result.insertedId });
    expect(insertedBook).toEqual(mockBook);
  });

  it('should update a doc in collection named books', async () => {
    const mockBook = {
      id: '1234',
      title: 'Writings',
      author: 'Writer Wannabe',
      pages: 200,
    };

    const insertResult = await books.insertOne(mockBook);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Update the name for the mock book
    const updateResult = await books.updateOne(
      { _id: insertResult.insertedId },
      { $set: { author: 'Writer Published' } }
    );

    expect(updateResult.modifiedCount).toBe(1);

    // Retrieve the updated book from the database
    const updatedBook = await books.findOne({ _id: insertResult.insertedId });

    // Expected book after update, including the _id
    const expectedBook = {
      _id: insertResult.insertedId,
      id: '1234',
      title: 'Writings',
      author: 'Writer Published',
      pages: 200,
    };

    expect(updatedBook).toEqual(expectedBook);
  });

  it('should delete a doc from the books collection', async () => {
    const mockBook = {
      id: '1234',
      title: 'Writings',
      author: 'Writer Wannabe',
      pages: 200,
    };

    const insertResult = await books.insertOne(mockBook);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Delete the inserted book
    const deleteResult = await books.deleteOne({ _id: insertResult.insertedId });

    expect(deleteResult.deletedCount).toBe(1);

    // Check if the book is no longer in the database
    const deletedBook = await books.findOne({ _id: insertResult.insertedId });
    expect(deletedBook).toBeNull();
  });

  it('should retrieve a doc from the books collection', async () => {
    const mockBook = {
      id: '1234',
      title: 'Writings',
      author: 'Writer Wannabe',
      pages: 200,
    };

    const insertResult = await books.insertOne(mockBook);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Retrieve the inserted book
    const retrievedBook = await books.findOne({ _id: insertResult.insertedId });

    expect(retrievedBook).toEqual(mockBook);
  });
});