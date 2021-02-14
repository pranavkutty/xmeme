require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });
db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"));

app.use(express.static("../meme-frontend"));
app.use(express.json())


//router for incoming requests
const memesRouter = require('./routes/memes');
app.use('/memes', memesRouter)


//server listen
app.listen(8081, () => console.log("Server has started"));

