const express = require('express');
const firmController = require('../controllers/firmController'); 
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router() 

router.post('/add-firm', verifyToken, firmController.addFirmtoVendor);

// this is the standard format to get the images form backend to forntend (this is image routes)
router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', image/jpeg);
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
})

router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router


