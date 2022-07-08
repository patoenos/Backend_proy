const { Router } = require('express');
const router = Router();

const products = require('./products.js');
const cart = require('./cart.js');

router.use('/productos', products);
router.use('/carrito', cart);

module.exports = router;