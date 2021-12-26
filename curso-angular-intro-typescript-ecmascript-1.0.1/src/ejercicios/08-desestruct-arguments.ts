/*
    ===== Código de TypeScript =====
*/

export interface Producto{
    desc: string;
    precio: number; 
}

const telefono: Producto ={
    desc: 'nokia A1',
    precio: 1000
}

const tableta: Producto ={
    desc: 'Ipad Air',
    precio: 2000
}

export const impuestoSobreVenta = (productos: Producto[]):[number, number] =>{
    let total = 0;
    /*productos.forEach((producto: Producto) => {
        total += producto.precio;
    });*/

    productos.forEach(({precio}) => {
        total += precio;
    });

    return [total, total*0.15];
};

const articulos = [telefono, tableta];

const [total, isv] = impuestoSobreVenta(articulos);

console.log(total, isv);