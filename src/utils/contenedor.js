const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    }
    async save(object) {        
        try {
            let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8')); // Lee archivo "fisico"
            
            !products.length ? object.id = 1 : object.id = products[products.length - 1].id + 1; //Si no existen registros, crea ID=1 y si sí, lo incrementa por 1
            products.push(object);
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, '\t')); //Reescrube el archivo
            return object.id; //regresa el ID que se usa fuera de container
        } catch (err) {            
            if (err.code === 'ENOENT') { // Si el archivo no existe lo crea conel write, le asigna el id 1.
                object.id = 1;
                await fs.promises.writeFile(this.file, JSON.stringify([object], null, '\t'));
                return object.id;
            } else {
                console.log('Error en método save: ', err);
            }
        }
    }
    async getById(number) { // devuelve el objeto con el id indicado       
        try {
            let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
            const object = products.find(object => object.id === number);
            return object ? object : null;
        } catch (err) {
            console.log('Error en método getById: ', err);
        }
    }
    async getAll() { // devuelve todos los registros del archivo       
        try {
            return JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
        } catch (err) {           
                console.log('Error en método getAll: ', err);
           }
    }    
    async deleteById(number) {    // borra el registro con el id indicado     
        try {
            let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
            let productsAct = products.filter(object => object.id != number);
            await fs.promises.writeFile(this.file, JSON.stringify(productsAct, null, '\t'));
        } catch (err) {
            console.log('Error en método deleteById: ', err);
        }
    }
    async deleteAll() { // Elimina todos los registros "[]"        
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, '\t'));
        } catch (err) {
            console.log('Error en método deleteAll: ', err);
        }
    }
    async updateById(id, object) { // Actualiza registro segun id      
        try {
            let products = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'));
            object.id = id;            
            const index = products.findIndex((product) => {
                return product.id === object.id;
            })

            if (index !== -1) {
                products[index] = object;
                await fs.promises.writeFile(this.file, JSON.stringify(products, null, '\t'));
                return object;
            } else {
                return { error: 'Producto no encontrado'}
            }
        } catch (err) {
            console.log('Error en método updateById: ', err);
        }
    }
}
module.exports = {
    Contenedor: Contenedor,
};