const { response } = require("express");
const { validationResult } = require("express-validator");


// next se llama en caso de que todo salga bien
const validarCampos = (req, res=response, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    //Funcion del middleware cuando todo esta OK
    next();
}

module.exports={ validarCampos }