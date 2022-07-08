const { Contenedor } = require('../utils/contenedor');
const { Producto } = require('../utils/product');
const { Cart } = require('../utils/cart');

const productos = new Contenedor('./productos.txt'); //Va hacia constructor, se instancía, y agarra datos de los archivos físicos
const carts = new Contenedor('./carts.txt'); //idem

// Crea un cart
const newCart = async (req, res) => {
    try {
        let id = await carts.save(new Cart);
        res.status(201).json(id);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Elimina cart de acuerdo al id
const deleteCart = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const cart = await carts.getById(id);

        if (!cart) throw 'Carrito no encontrado';
        
        await carts.deleteById(id);
        res.status(200).json('Carrito eliminado');
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Devuelve todos los productos de un carrito
const getProductsCart = async (req, res) => {
    try {
        
        const id = document.getElementById('idSearch')  /* Number(req.params.id); */ //probar con params o req body No se como hacer para que el input vincule al id este
        const cart = await carts.getById(id);

        if (!cart) throw 'Carrito no encontrado';

        res.status(200).json(cart.productos);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Recibe y agrega un producto en el carrito
const saveProductsCart = async (req, res) => {
    try {
        const { id } = req.body;

        const id_cart = Number(req.params.id);
        const currentCart = await carts.getById(id_cart);

        if (!currentCart) throw 'Carrito no encontrado';

        const cart = new Cart;
        cart.updateCart(currentCart);

        if (!cart) throw 'Carrito no encontrado';

        const producto = await productos.getById(Number(id));
        if (!producto) throw 'Producto no encontrado';

        if (producto.stock == 0) throw 'No hay stock del producto';
        cart.addProduct(producto);

        await carts.updateById(id_cart, cart);
        res.status(200).json('Producto agregado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}


// // Elimina un producto de un carrito según sus id
const deleteProductCart = async (req, res) => {
    try {
        const id_cart = Number(req.params.id);
        const currentCart = await carts.getById(id_cart);

        if (!currentCart) throw 'Carrito no encontrado';
        
        const cart = new Cart;
        cart.updateCart(currentCart);
        
        const id = Number(req.params.id_prod);
        const producto = await cart.getById(id);

        if (!producto) throw 'Producto no se encuentra en el carrito';

        cart.removeProduct(producto);
        await carts.updateById(id_cart, cart);
        res.status(200).json('Producto eliminado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

module.exports = { newCart, deleteCart, getProductsCart, saveProductsCart, deleteProductCart } 