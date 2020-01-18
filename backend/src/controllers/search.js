const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const allElementsToLowerCase = require('../utils/allElementsToLowerCase')

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query
        let techsArray = parseStringAsArray(techs)
        techsArray = allElementsToLowerCase(techsArray)
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })
        res.json({devs})
    }
}