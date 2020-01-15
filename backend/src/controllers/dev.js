const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const allElementsToLowerCase = require('../utils/allElementsToLowerCase')

// index, show, store, update, destroy


module.exports = {

    async index(req, res) {
        const devs = await Dev.find()
        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body
        
        let dev = await Dev.findOne({ github_username })

        if (!dev) {

            const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = githubResponse.data
        
            let techsArray = parseStringAsArray(techs)
            techsArray = allElementsToLowerCase(techsArray)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })

        } else {
            return res.status(400).json({error: 'User alredy exists!'})
        }

        return res.json(dev)

    },

    async update(req, res) {
        const { id, newData } = req.body
        
        if(newData.techs) {
            newData.techs = parseStringAsArray(newData.techs)
            newData.techs = allElementsToLowerCase(newData.techs)
        }

        const dev = await Dev.findByIdAndUpdate(id, newData, {new:true})

        return res.json(dev)
    },

    async destroy(req, res) {
        Dev.findByIdAndRemove(req.body.id)
        res.send()
    }
}