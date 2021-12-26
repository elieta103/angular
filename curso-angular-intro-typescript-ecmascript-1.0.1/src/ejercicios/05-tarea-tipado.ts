/*
    ===== Código de TypeScript =====
*/
interface SuperHeroe{
    nombre: string;
    edad: number;
    direccion: Direccion;
    mostrarDireccion: () => string;
}

interface Direccion{
    calle: string;
    ciudad: string;
    pais: string;
}

const superHeroe: SuperHeroe = {
    nombre : 'Spiderman',
    edad : 30,
    direccion:{
        calle: 'Main Street',
        pais: 'USA',
        ciudad: 'NY'
    },
    mostrarDireccion(){
        return this.nombre + ', '+this.direccion.ciudad+', '+this.direccion.pais;
    }
}

const direccion = superHeroe.mostrarDireccion();
console.log(direccion);