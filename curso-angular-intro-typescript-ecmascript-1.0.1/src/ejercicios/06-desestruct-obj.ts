/*
    ===== Código de TypeScript =====
*/
interface Reproductor{
    volumen: number;
    segundo: number;
    cancion: string;
    detalles:  Detalles;
}

interface Detalles{
    autor: string;
    anio: number;
}


const reproductor: Reproductor = {
    volumen: 90,
    segundo: 36,
    cancion: 'Mess',
    detalles: {
        autor: 'Ed Sheeran',
        anio: 2015
    }
}

const {volumen, segundo, cancion, detalles } = reproductor
const {autor, anio } = detalles;

//const {volumen, segundo, cancion, detalles :{autor, anio} } = reproductor

console.log('El volumen actual es de : ', volumen);
console.log('El segundo actual es de : ', segundo);
console.log('La cancion actual es  : ', cancion);
console.log('El autor es : ', autor);
console.log('El año es : ', anio);
