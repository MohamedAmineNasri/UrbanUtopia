const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    type: {type: String, required:true},
    name: {type: String, required:true},
    description: {type: String, required:true},
    imagethumbnail: {type: String},
    imageLg: {type: String},
    country: {type: String, required:true},
    address: {type: String, required:true}, // Remove if not used
    bedrooms: {type: String, required:true},
    bathrooms: {type: String, required:true},
    surface: {type: String, required:true},
    year: {type: String, required:true},
    price: {type: String, required:true},
    agentName: {type: String, required:true},
    agentPhone: {type: String, required:true},
});

module.exports = mongoose.model('Property', propertySchema) 
