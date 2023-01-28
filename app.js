const express = require("express");
const app = express();
var router1 = require("./apiRouter.js");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const { json } = require("express");
const port = process.env.PORT || 3000;
const { Pool, Client } = require('pg');
const db = require('./models');

//  config Swagger 
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

// config database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodePostgres',
  password: 'postgres',
  port: 5432,
})
 

app.use('/admin/api/v1/',router1);
app.use('/api/v1/',router1);

// Add MiddleWare config Cors
app.use((req,res,next) => {
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers','Content-Type');
next();
})


const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles)



// api Register/ Api Login
app.post('/register',(req,res,next)=> {
  var useName = req.body.useName;
  var passWord = req.body.passWord;
  console.log(useName + passWord);
  return json('e');
  })
  
////Login 
// Api Login
app.post('/login',(req,res)=> {
  var useName = req.body.useName;
  var passWord = req.body.passWord;
  console.log(useName + passWord);
  })
  
app.get('/home',(req,res)=>{
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
    res.json('hihi');
  })
})

db.sequelize.sync().then((req)=>{
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});