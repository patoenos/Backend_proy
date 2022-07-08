require('dotenv').config(); //traermos dotenv para activar archivo .ENV
const express = require('express'); // Traemos express que hace de todo
const app = express(); //La app con express ejecutada
const path = require('path'); //Path para la config del static
const puerto = process.env.PUERTO; //el puerto en archivo de enviroment
const rutas = require('./routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname,'../public')));
app.use('/api', rutas); 

app.listen(puerto, (err) => {
    if (!err) {
        console.log(`El servidor se inicio en el puerto ${puerto}`);
    } else {
        console.log(`Error al iniciar el servidor en el puerto ${puerto}. Error ${err}`);
    }
})