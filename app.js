const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql')
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000

// Parsing midleware
// Parse application 
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());

// Static files 
app.use(express.static('public'))

// Templating engine 
app.engine('hbs', exphbs.engine({extname: '.hbs'}))
app.set('view engine', 'hbs');

// Connection port
const pool = mysql.createPool( {
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

//Connection to DB

pool.getConnection((error, connection) => {
    if(error) throw error; // not connected
    console.log("Connected as ID"+ connection.threadId);
})

const studentRoutes = require('./server/routes/student');
const instructorRoutes = require('./server/routes/instructor');
const courseRoutes = require('./server/routes/course');

// Specifying routes
app.use('/', studentRoutes, instructorRoutes, courseRoutes);

app.listen(port, () => {
    console.log("Serving on port 3000");
})