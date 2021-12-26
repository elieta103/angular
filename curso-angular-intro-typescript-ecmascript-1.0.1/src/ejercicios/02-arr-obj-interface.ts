
/*
    ===== Código de TypeScript =====
*/

let cualquiera:(boolean | string | boolean | number)[] = [1, 'Eliel', true];  //Permitido, no buena practica

let habilidades: string[] = ['Bash', 'Counter', 'Healing']; // Fuertemente tipado

interface Personaje{
    nombre: string;
    hp: number;
    habilidades: string[];
    puebloNatal?: string;  //Opcional
}

const personaje: Personaje ={
    nombre: 'Strider',
    hp: 100,
    habilidades: ['Linux', 'Java', 'Bash']
}

personaje.puebloNatal = "Naucalpan";

console.log(cualquiera);
console.log(habilidades);
console.table(personaje);

