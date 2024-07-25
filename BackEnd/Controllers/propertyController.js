const Property = require('../Models/Property')
const cloudinary = require('../config/cloudinary');


exports.createProperty = async (req, res) => {
    try {
        const { 
            type, name, description, country, address, bedrooms, bathrooms, surface, year, price, agentName, agentPhone 
        } = req.body;

        const imagethumbnail = req.files.imagethumbnail[0]; 
        const imageLg = req.files.imageLg[0];

        if (!imagethumbnail || !imageLg) {
            return res.status(400).json({ message: 'Image files are required' });
        }

        const thumbnailUpload = await cloudinary.uploader.upload(imagethumbnail.path, { folder: 'properties' });
        const imageLgUpload = await cloudinary.uploader.upload(imageLg.path, { folder: 'properties' });

        const property = new Property({
            type, name, description, country, address, bedrooms, bathrooms, surface, year, price, agentName, agentPhone,
            imagethumbnail: thumbnailUpload.secure_url,
            imageLg: imageLgUpload.secure_url,
        });

        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find()
        res.status(200).json(properties)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getPropertyById = async (req, res) => {
        try {
            const property = await Property.findById(req.params.id);
            if (!property) return res.status(404).json({ message: 'Property not found' });
            res.status(200).json(property);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

exports.updatePropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id, req.body, {new: true})
        if (!property) return res.status(404).json({
            message: 'Property Not Found !'
        })
        res.status(200).json(property)
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}

exports.deletePropertyById = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id)
        if(!property) return res.status(404).json({
            message: 'Property Not Found'
        })
        res.status(200).json({
            message: 'Property Deleted Successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}