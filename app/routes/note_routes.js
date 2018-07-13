// routes/note_routes.js

// In Express, routes are wrapped in a function, which takes 
// the Express instance and a database as arguments.

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    // CRUD: READ
    app.get('/notes/:id', (req, res) => {
        // find a note
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(item);
            }
        });
    });

    // CRUD: CREATE
    app.post('/notes', (req, res) => {
        // Create a note
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // CRUD: DELETE
    app.delete('/notes/:id', (req, res) => {
        // delete a note
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    // CRUD: PUT
    // todo: if any field is null in the params, the db update will blank all 
    // records. Add logic to only update those passed in
    app.put('/notes/:id', (req, res) => {
        // edit a note
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(note);
            }
        });
    });

};
