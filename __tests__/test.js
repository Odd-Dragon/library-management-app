const mongodb = require('../db/connect');
const env = require('dotenv').config();

mongodb.initDb((err, db) => {
  if (err) {
    console.log('Error connecting to the database');
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

const testAll = async(req, res) => {
  console.log("");
}



// from documentation 

const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});