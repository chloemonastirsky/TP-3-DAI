import dayjs from 'dayjs';
import fs from 'fs';

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


function mostrarPais(nombrePais) {
    fetch('https://restcountries.com/v3.1/all')
    .then (res => res.json())
    .then (data => {
        const pais = data.data[nombrePais];
        if (pais) {
            console.log(`El país es ${nombrePais}`);
        } else {
            console.log(`No se encontró información para el país ${nombrePais}`);
        }
    })
}
mostrarPais("Argentina");

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


