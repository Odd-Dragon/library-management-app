const express = require('express');
const app = express();

const port = process.env.port || 8080;
const env = require('dotenv').config();
const mongodb = require('./db/connect');

const cors = require('cors');
const swagger = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('js'));

const corsOptions = {
  origin: 'http://localhost:8080',
  // origin: 'https://library-management-app-h2gk.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err, db) => {
  if (err) {
    console.log('Error connecting to the database');
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
    info: {
      version: "1.0.0",
      title: "library-management-app",
      description: "This app allows a library patron to view the books, movies, and music available, as well as which ones they have checked out.",
    },
    host: "localhost:8080/",
    // host: "library-management-app-h2gk.onrender.com/",
    basePath: "/",
};

const fs = require('fs');

// Only create a new swagger document if it doesn't already exist 
if (!fs.existsSync(outputFile)) {

  // We will need to re-run this line to update the swagger_output file, 
  // after replacing localhost with the render link,
  // OR after adding new routes to the routes index.js. 
  swagger(outputFile, endpointsFiles, doc);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
});
