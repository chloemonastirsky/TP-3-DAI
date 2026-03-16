import fs from 'fs';

const productos = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'));

function getProductos() {
    return productos;
}

console.log(getProductos());