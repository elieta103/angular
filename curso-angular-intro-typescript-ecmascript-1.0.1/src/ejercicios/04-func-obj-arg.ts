interface PersonajeLOR{
    nombre: string;
    pv: number;
    mostrarHp: () => void;
}

function  curar (personaje: PersonajeLOR, curarX: number): void{
    personaje.pv +=curarX;
}

const nuevoPersonaje: PersonajeLOR = {
    nombre : "Eliel",
    pv: 50,
    mostrarHp(){
        console.log('Puntos de vida : ', this.pv);
    }
}

curar(nuevoPersonaje, 20);
nuevoPersonaje.mostrarHp();

