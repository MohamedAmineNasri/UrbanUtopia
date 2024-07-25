const router = require('express').Router();
const propertyController = require('../Controllers/propertyController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([{ name: 'imagethumbnail', maxCount: 1 }, { name: 'imageLg', maxCount: 1 }]), propertyController.createProperty);

router.get('/', propertyController.getAllProperties)

router.get('/:id', propertyController.getPropertyById)

router.put('/:id', propertyController.updatePropertyById)

router.delete('/:id', propertyController.deletePropertyById)

module.exports = router 