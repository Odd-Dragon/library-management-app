const express = require('express');
const app = express();

const cors = require('cors');
const swagger = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); 

const corsOptions = {
    origin: 'https://[projectName].onrender.com', // or localhost 
    methods: 'GET,POST,PUT,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
    info: {
      version: "1.0.0",
      title: "[Title of our API]",
      description: "[Description]",
    },
    host: "[projectName].onrender.com", // or localhost 
    basePath: "/",
};

const fs = require('fs');
if (!fs.existsSync(outputFile)) {
  swagger(outputFile, endpointsFiles, doc);
}

