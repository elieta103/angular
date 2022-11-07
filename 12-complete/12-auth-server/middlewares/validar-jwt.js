const { response } = require("express");
const jwt = require('jsonwebtoken');

// next se llama en caso de que todo salga bien
const validarJWT = (req, res=response, next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Error en token'
        });
    }

    try {

        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        //Setean parametros en el request para pasarlo a otra capa ej. controller
        req.uid = uid;
        req.name = name;

        console.log(uid, name);
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });       
    }

    //Funcion del middleware cuando todo esta OK
    next();
}

module.exports = { validarJWT }