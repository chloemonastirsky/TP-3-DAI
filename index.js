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
    fetch('https://api.first.org/data/v1/countries')
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


