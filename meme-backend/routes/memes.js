require('dotenv').config();
const express = require('express');
const router = express.Router()
const Meme = require('../models/meme')

module.exports = router

//endpoint to fetch latest 100 memes created
router.get("/", async (request, response) => {
    try {
        let memeArr = []
        const memes = await Meme.find({}, null, { 'sort': '-date', 'limit': 100 }, (err, memeFind) => {
            memeFind.forEach((memeSingle) => {
                memeArr.push({
                    "id": memeSingle._id,
                    "name": memeSingle.name,
                    "url": memeSingle.url,
                    "caption": memeSingle.caption
                })
            })
        })
        response.status(200).send(memeArr)
    } catch (err) {
        response.status(500).json({ message: err.message })
    }
});

//endpoint to post a meme
router.post("/", async (request, response) => {

    //check duplicate meme url
    let findDuplicate = await Meme.findOne({
        'url': request.body.url,
    })
    if (findDuplicate != null) {
        return response.status(409).json({ 'message': 'Duplicate url' })
    }
    const meme = new Meme({
        name: request.body.name,
        url: request.body.url,
        caption: request.body.caption,
    })


    try {
        const newMeme = await meme.save()
        response.status(201).json({ 'id': newMeme._id })
    } catch (err) {
        response.status(400).json({ message: err.message })
    }

});

//endpoint to get the data of a particular meme id
router.get("/:id", async (request, response) => {
    try {
        const meme = await Meme.findById(request.params.id)
        if (meme == null) {
            return response.status(404).json({ 'message': "Can't find meme" })
        }
        response.status(200).json({
            "id": meme._id,
            "name": meme.name,
            "url": meme.url,
            "caption": meme.caption
        });
    } catch (err) {
        response.status(500).json({ message: err.message })
    }
});

//endpoint to update caption or url
router.patch("/:id", async (request, response) => {
    try {
        const meme = await Meme.findById(request.params.id)
        if (meme == null) {
            return response.status(404).json({ 'message': "Can't find meme" })
        }
        if (request.body.url != null) {
            //check duplicate meme url
            let findDuplicate = await Meme.findOne({
                'url': request.body.url,
            })
            if (findDuplicate != null) {
                return response.status(409).json({ 'message': 'Duplicate url' })
            }
            meme.url = request.body.url
        }
        if (request.body.caption != null) {
            meme.caption = request.body.caption
        }

        try {
            const updatedMeme = await meme.save()
            response.status(204).end()
        } catch (err) {
            response.status(400).json({ message: error.message })
        }


    } catch (err) {
        response.status(500).json({ message: err.message })
    }
})

//endpoint to delete meme using meme id
router.delete('/:id', async (request, response) => {
    const meme = await Meme.findById(request.params.id)
    if (meme == null) {
        return response.status(404).json({ 'message': "Can't find meme" })
    }
    try {
        await meme.remove()
        response.json({ 'message': 'Deleted Meme' })
    } catch (err) {
        response.status(500).json({ message: err.message })
    }
})

//endpoint to get additional data such as date
router.get("/date/data", async (request, response) => {
    try {
        let memeArr = []
        const memes = await Meme.find({}, null, { 'sort': '-date', 'limit': 100 }, (err, memeFind) => {
            memeFind.forEach((memeSingle) => {
                memeArr.push({
                    "id": memeSingle._id,
                    "name": memeSingle.name,
                    "url": memeSingle.url,
                    "caption": memeSingle.caption,
                    "date": new Date(memeSingle.date)
                })
            })
        })

        response.status(200).send(memeArr)
    } catch (err) {
        response.status(500).json({ message: err.message })
    }
});