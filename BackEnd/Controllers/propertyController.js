const Property = require('../Models/Property')

exports.createProperty = async (req, res) => {
    try {
        const property = new Property(req.body)
        await property.save()
        res.status(201).json(property)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

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