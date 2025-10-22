const express = require("express");
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/add-product/:firmId', productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirm); 

// this is the standard format to get the images form backend to forntend (this is image routes) then write the middle ware in index.js
router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', image/jpeg);
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
})

router.delete("/:productId", productController.deleteProductById)


module.exports = router
