const express = require("express");
const app = express();
var router = require("./routes/index");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const { json } = require("express");
const port = process.env.PORT || 3000;
const { Pool, Client } = require('pg');
const db = require('./models');


//Config body parse jSon
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//  config Swagger 
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js']
swaggerAutogen(outputFile, endpointsFiles)

// config database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodePostgres',
  password: 'postgres',
  port: 5432,
})
 
// Add MiddleWare config Cors
app.use((req,res,next) => {
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers','Content-Type');
next();
})
  
// Route
app.use('/admin/',router);
app.use('/',router);

//force: true will drop the table if it already exists
db.sequelize.sync().then((req)=>{
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});