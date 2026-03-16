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