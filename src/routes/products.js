const { Router } = require('express');
const router = Router();

const { getProducts, getProductById, saveProduct, updateProduct, deleteProduct } = require('../controllers/products.js');

// Devuelve todos los productos
router.get('/', getProducts);
// Devuelve un producto según su id
router.get('/:id', getProductById);
// Recibe y agrega un producto, lo devuelve con su id asignado
router.post('/', saveProduct);
// Recibe y actualiza un producto segun su id
router.put('/:id', updateProduct);
// Elimina un producto según su id
router.delete('/:id', deleteProduct);

module.exports = router;