require('dotenv').config();
const express = require('express')
const router = express.Router()
const Meme = require('../models/meme')

module.exports = router

//endpoint to fetch latest 100 memes created
router.get("/", async (request,response)=>{
    try{
        const memes = await Meme.find()
        response.status(200).json(memes)
    }catch (err){
        response.status(500).json({message: err.message})
    }
});

//endpoint to post a meme
router.post("/", async (request,response)=>{

    const meme = new Meme({
        name: request.body.name,
        url: request.body.url,
        caption: request.body.caption,
    })
    

    try{
        const newMeme = await meme.save()
        response.status(201).json({'id': newMeme._id})
    }catch(err){
        response.status(400).json({message: err.message})
    }

});

//endpoint to get the data of a particular meme id
router.get("/:id",async (request,response)=>{
    try{
        meme = await Meme.findById(request.params.id)
        if(meme == null){
            return response.status(404).json({'message': "Can't find subscriber"})
        }
        response.status(200).json(meme);
    }catch(err){
        response.status(400).json({message: err.message})
    }
});
