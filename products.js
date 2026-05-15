// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ************ Controller Require ************
const productsController = require('./productsController');

// ************ Multer ************
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
       cb(null, './public/images/products');
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage: storage});

// Devolver un producto 
router.get('/detail/:id/', productsController.detail); 

// Devolver todos los productos  
router.get('/', productsController.index);

// Crear un producto
router.get('/create/', productsController.create); 
router.post('/', upload.single("image"), productsController.store);

// Editar un producto 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', upload.single("image"), productsController.update);

// Eliminar un producto 
router.delete('/:id', productsController.destroy);

module.exports = router;