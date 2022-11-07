// Se agrega para tener disponible el texto predictivo
const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res=response) =>{
    const {email, name, password} = req.body;

    try {
        // Verificar  la duplicidad del mail
        const usuario = await Usuario.findOne( { email: email } );
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario, ya existe en la BD.'
            });
        }

        // Crear usuario con el modelo
        const dbUsuario = new Usuario(req.body);

        // Hash de la contraseña
        const salt = bcrypt.genSaltSync();   // Genera numeros aleatorios, puede recibir el no. de rounds.
        dbUsuario.password = bcrypt.hashSync( password, salt);

        // Generar el JWT
        const token = await generarJWT(dbUsuario.id, dbUsuario.name, dbUsuario.email);

        // Crear usuario en la BD 
        await dbUsuario.save();

        // Generar la respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUsuario.id,
            name : name,
            token: token,
            email: email,
            msg: 'Usuario creado con éxito.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, Verifiquelo con el admin'
        });        
    }
}

const loginUsuario = async (req, res = response) =>{

    const {email, password} = req.body;

    try {
     
        //Confirmar si existe el mail
        const dbUsuario = await Usuario.findOne({email: email});
        if( ! dbUsuario){
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe.'
            });
        }
        //Confirmar si existe el password
        //Password sin cifrar, lo cifra y compara contra el cifrado de la BD 
        const validPassword = bcrypt.compareSync(password, dbUsuario.password);
        if( ! validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido.'
            });
        }
 
    //Generar JWT 
    const token = await generarJWT(dbUsuario.id, dbUsuario.name, dbUsuario.email);

    // Generar la respuesta exitosa
    return res.status(201).json({
        ok: true,
            uid: dbUsuario.id,
            name : dbUsuario.name,
            token: token,
            email: email,
            msg: 'Login exitoso'
    });
   
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, Verifiquelo con el admin'
        });        
    }    
}

const revalidarToken = async(req, res) =>{
    //Recuperan parametros que se subieron al req en el middleware
    const {uid} = req;

    //Buscar email y agregar en respuesta
    console.log('Consulta email :')
    const usuarioBD = await Usuario.findById( uid );
    console.log('Consulta email : '+usuarioBD.email);
    
    //Generar nuevo JWT 
    const token = await generarJWT(uid, usuarioBD.name);

    return res.json({
        ok: true,
        uid: uid,
        name:  usuarioBD.name,
        token: token,
        email: usuarioBD.email,
        msg: 'Token revalidado' 
    });
}

//Exportar funciones de controllers
module.exports = { crearUsuario, loginUsuario, revalidarToken }