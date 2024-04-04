const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('CRUD Operations', () => {
  let connection;
  let db;
  let music;
  let insertedIds = []; // Array to store inserted document IDs

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {});
    db = connection.db();
    musics = db.collection('Music');
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    // Delete only the documents that were inserted during the test
    for (const id of insertedIds) {
      await musics.deleteOne({ _id: id });
    }
    insertedIds = []; // Clear the array after deletion
  });

  it('should insert a doc into collection named music', async () => {
    const mockMusic = {
      id: '1234567',
      song_title: 'Singing',
      album_title: 'Always',
      length: 3,
    };

    const result = await musics.insertOne(mockMusic);
    insertedIds.push(result.insertedId); // Store the inserted ID

    const insertedMusic = await musics.findOne({ _id: result.insertedId });
    expect(insertedMusic).toEqual(mockMusic);
  });

  it('should update a doc in collection named music', async () => {
    const mockMusic = {
      id: '1234567',
      song_title: 'Singing',
      album_title: 'Always',
      length: 3,
    };

    const insertResult = await musics.insertOne(mockMusic);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Update the album title for the mock music
    const updateResult = await musics.updateOne(
      { _id: insertResult.insertedId },
      { $set: { album_title: 'Always Singing' } }
    );

    expect(updateResult.modifiedCount).toBe(1);

    // Retrieve the updated music from the database
    const updatedMusic = await musics.findOne({ _id: insertResult.insertedId });

    // Expected music after update, including the _id
    const expectedMusic = {
      _id: insertResult.insertedId,
      id: '1234567',
      song_title: 'Singing',
      album_title: 'Always Singing',
      length: 3,
    };

    expect(updatedMusic).toEqual(expectedMusic);
  });

  it('should delete a doc from the music collection', async () => {
    const mockMusic = {
      id: '1234567',
      song_title: 'Singing',
      album_title: 'Always Singing',
      length: 3,
    };

    const insertResult = await musics.insertOne(mockMusic);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Delete the inserted music
    const deleteResult = await musics.deleteOne({ _id: insertResult.insertedId });

    expect(deleteResult.deletedCount).toBe(1);

    // Check if the music is no longer in the database
    const deletedMusic = await musics.findOne({ _id: insertResult.insertedId });
    expect(deletedMusic).toBeNull();
  });

  it('should retrieve a doc from the music collection', async () => {
    const mockMusic = {
      id: '1234567',
      song_title: 'Singing',
      album_title: 'Always Singing',
      length: 3,
    };

    const insertResult = await musics.insertOne(mockMusic);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Retrieve the inserted music
    const retrievedMusic = await musics.findOne({ _id: insertResult.insertedId });

    expect(retrievedMusic).toEqual(mockMusic);
  });
});