require('dotenv').config();
const { PORT, MONGO_URI } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const History = require('./model');

const app = express();
app.listen(PORT, function() {
    console.log(`Express has started on port ${PORT}`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONNECT TO MONGODB SERVER
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.post('/save', (req, res) => {

    History.findOneById(req.data.historyId)
        .then((history) => {
            history.children.
        })
        .catch(err => res.status(500).send(err));

    // History 없으면 -> History save 후 snapshot 추가
})
//app.get('/', function(req, res) {
//    res.send('Hello world');
//});