require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true,useNewUrlParser: true });
db = mongoose.connection;
db.on('error',(error)=>console.error(error));
db.once('open',()=>console.log("Connected to database"));

app.use(express.json())

const memesRouter = require('./routes/memes');
app.use('/memes',memesRouter)



app.listen(8081,()=> console.log("Server has started"));

