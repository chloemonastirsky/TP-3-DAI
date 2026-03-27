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

        const nombre    = datos.name.common;      
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
    fs.writeFileSync('./productos.json', JSON.stringify(productos, null, 2));
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
    const csv = [encabezados, ...filas].join('\n');
    fs.writeFileSync('./productos.csv', csv);
}

generarCSV();

function temporizador() {
    let contador = 0;
       const intervalo= setInterval(() => {
            contador++;
            console.log(`Han pasado ${contador} segundos`);
            if (contador === 10) {
                clearInterval(intervalo);
               setTimeout(() => {
                console.log("¡Tiempo terminado!");
                
            }, 500);
            }
        }, 1000);
}

temporizador();

function analizarTexto(texto){
    const palabras = texto.split(' ');
    const cantidadPalabras = palabras.length;
    const cantidadCaracteres = texto.length;
    const cantidadVocales=texto.length - texto.replace(/[aeiouAEIOU]/g, '').length;
    const cantidadConsonantes = texto.length - texto.replace(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g, '').length;
    console.log(`Cantidad de palabras: ${cantidadPalabras}`);
    console.log(`Cantidad de caracteres: ${cantidadCaracteres}`);
    console.log(`Cantidad de vocales: ${cantidadVocales}`);
    console.log(`Cantidad de consonantes: ${cantidadConsonantes}`);
}

analizarTexto("Hola, mundo");

function validarPassword(password){
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        console.log("Contraseña inválida. Debe tener al menos 8 caracteres, una letra mayúscula y un número.");
    }else{
        console.log("Contraseña válida.");
    }
    
}

validarPassword("Contraseña123");





