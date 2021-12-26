/*
    ===== Código de TypeScript =====
*/

function sumar(a: number,b: number): number{
    return a+b;
}
const resultado = sumar(90, 8);
console.log(resultado);


const sumarFlecha = (a: number, b: number): number =>{
    return a+b;
};
const resultadoFlecha = sumarFlecha(90, 8);
console.log(resultadoFlecha);

// Orden de los argumentos
// 1.- Obligados
// 2.- Opcionales
// 3.- Por default

function multiplicar(numero: number, otroNumero?: number, base: number=2):number {
    return numero * base;
}
//const res = multiplicar(5);    //imprime = 10      Llamada a f(x) valida
//const res = multiplicar(5, 10);  //imprime = 10    Llamada a f(x) valida
const res = multiplicar(5,10, 4);  //imprime = 20    Llamada a f(x) valida

console.log(res);