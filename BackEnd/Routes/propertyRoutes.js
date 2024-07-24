const router = require('express').Router();
const propertyController = require('../Controllers/propertyController')


router.post('/', propertyController.createProperty)

router.get('/', propertyController.getAllProperties)

router.get('/:id', propertyController.getPropertyById)

router.put('/:id', propertyController.updatePropertyById)

router.delete('/:id', propertyController.deletePropertyById)

module.exports = router