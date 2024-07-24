const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    type: {type: String, requried:true},
    name: {type: String, requried:true},
    description: {type: String, requried:true},
    imagethumbnail: {type: String, requried:true},
    imageLg: {type: String, requried:true},
    country: {type: String, requried:true},
    address: {type: String, requried:true},
    bedrooms: {type: String, requried:true},
    bathrooms: {type: String, requried:true},
    surface: {type: String, requried:true},
    year: {type: String, requried:true},
    price: {type: String, requried:true},
    agentName: {type: String, requried:true},
    agentPhone: {type: String, requried:true},
    agentImage: {type: String, requried:true},
})
module.exports = mongoose.model('Property', propertySchema)
