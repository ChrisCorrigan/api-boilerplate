// server.js

const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const db            = require('./config/db');

const app           = express();

const port          = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    // Make sure you add the dababase name and not the collection name
    var db = database.db("api_boilerplate")
    require('./app/routes')(app, db);

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})



