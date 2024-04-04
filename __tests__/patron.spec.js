const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('CRUD Operations', () => {
  let connection;
  let db;
  let patrons;
  let insertedIds = []; // Array to store inserted document IDs

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {});
    db = connection.db();
    patrons = db.collection('Patrons');
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    // Delete only the documents that were inserted during the test
    for (const id of insertedIds) {
      await patrons.deleteOne({ _id: id });
    }
    insertedIds = []; // Clear the array after deletion
  });

  it('should insert a doc into collection named Patrons', async () => {
    const mockPatron = {
      id: '123456789',
      first_name: 'Areya',
      last_name: 'Kiddingme',
      email: 'helpme@anywhere.com',
      address: '1234 Street',
      title: 'Reader',
      employee_num: '987654321',
      start_date: '1/01/2024',
    };

    const result = await patrons.insertOne(mockPatron);
    insertedIds.push(result.insertedId); // Store the inserted ID

    const insertedPatron = await patrons.findOne({ _id: result.insertedId });
    expect(insertedPatron).toEqual(mockPatron);
  });

  it('should update a doc in collection named Patrons', async () => {
    const mockPatron = {
      id: '123456789',
      first_name: 'Areya',
      last_name: 'Kiddingme',
      email: 'helpme@anywhere.com',
      address: '1234 Street',
      title: 'Reader',
      employee_num: '987654321',
      start_date: '1/01/2024',
    };

    const insertResult = await patrons.insertOne(mockPatron);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Update the email for the mock patron
    const updateResult = await patrons.updateOne(
      { _id: insertResult.insertedId },
      { $set: { email: 'newemail@anywhere.net' } }
    );

    expect(updateResult.modifiedCount).toBe(1);

    // Retrieve the updated patron from the database
    const updatedPatron = await patrons.findOne({ _id: insertResult.insertedId });

    // Expected patron after update, including the _id
    const expectedPatron = {
      _id: insertResult.insertedId,
      id: '123456789',
      first_name: 'Areya',
      last_name: 'Kiddingme',
      email: 'newemail@anywhere.net',
      address: '1234 Street',
      title: 'Reader',
      employee_num: '987654321',
      start_date: '1/01/2024',
    };

    expect(updatedPatron).toEqual(expectedPatron);
  });

  it('should delete a doc from the patrons collection', async () => {
    const mockPatron = {
      id: '123456789',
      first_name: 'Areya',
      last_name: 'Kiddingme',
      email: 'newemail@anywhere.net',
      address: '1234 Street',
      title: 'Reader',
      employee_num: '987654321',
      start_date: '1/01/2024',
    };

    const insertResult = await patrons.insertOne(mockPatron);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Delete the inserted patron
    const deleteResult = await patrons.deleteOne({ _id: insertResult.insertedId });

    expect(deleteResult.deletedCount).toBe(1);

    // Check if the patron is no longer in the database
    const deletedPatron = await patrons.findOne({ _id: insertResult.insertedId });
    expect(deletedPatron).toBeNull();
  });

  it('should retrieve a doc from the patrons collection', async () => {
    const mockPatron = {
      id: '123456789',
      first_name: 'Areya',
      last_name: 'Kiddingme',
      email: 'newemail@anywhere.net',
      address: '1234 Street',
      title: 'Reader',
      employee_num: '987654321',
      start_date: '1/01/2024',
    };

    const insertResult = await patrons.insertOne(mockPatron);
    insertedIds.push(insertResult.insertedId); // Store the inserted ID

    // Retrieve the inserted patron
    const retrievedPatron = await patrons.findOne({ _id: insertResult.insertedId });

    expect(retrievedPatron).toEqual(mockPatron);
  });
});