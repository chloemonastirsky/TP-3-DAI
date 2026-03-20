import dayjs from 'dayjs';
import fs from 'fs';
import axios from 'axios';

const productos = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'));

function getProductos() {
    return productos;
}

console.log(getProductos());

function agregarProducto(nombre, precio) {
    const nuevoProducto = { nombre, precio };
    productos.push(nuevoProducto);
    fs.writeFileSync('./productos.json', JSON.stringify(productos, null, 2));
}

agregarProducto('Monitor', 5000);
console.log(getProductos());

function mostrarFechaHoraActual(){
   const hoy = dayjs();
    console.log(hoy.format('DD/MM/YYYY'));     
    console.log(hoy.format('HH:mm:ss'));   
}
mostrarFechaHoraActual();


async function obtenerPais(nombrePais) {
    try {
        const respuesta = await axios.get(`https://restcountries.com/v3.1/name/${nombrePais}`);
        
        const datos = respuesta.data[0];

        const nombre    = datos.name.common;      // ← name.common
        const capital   = datos.capital[0];
        const region    = datos.region;
        const poblacion = datos.population;

        console.log(`País: ${nombre} Capital: ${capital} Región: ${region} Población: ${poblacion}`);

    } catch (error) {
        console.log("País no encontrado:", error.message);
    }
}

obtenerPais("China");


function buscarProducto(nombreProducto) {  
    import('./productos.json')
    for (const producto of productos) {
        if (producto.nombre === nombreProducto) {
            console.log(`El producto ${nombreProducto} tiene un precio de ${producto.precio}`);
            return;
        }    
    }
}

console.log(buscarProducto("Monitor"));

function generarCSV() {
    const encabezados = "Nombre,Precio\n";
    const filas = productos.map(producto => `${producto.nombre},${producto.precio}`);
    const contenidoCSV = encabezados + filas;
    fs.writeFileSync('./productos.csv', contenidoCSV);
}

generarCSV();



