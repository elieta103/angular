/*
    ===== Código de TypeScript =====
*/

import { impuestoSobreVenta, Producto } from "./08-desestruct-arguments";



const carritoCompras: Producto[] =[
    {
        desc:'Telefono 1 ',
        precio:100
    },
    {
        desc:'Telefono 2 ',
        precio:200
    }
];

const [total, isv] = impuestoSobreVenta(carritoCompras);
console.log(total, isv);