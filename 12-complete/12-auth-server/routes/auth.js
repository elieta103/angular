const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Crear un User, solo se pone como referencia : crearUsuario. 
//Si se escribe crearUsuario(), se ejecutaria
router.post('/new',
            [
                check('name','El Nombre es obligatorio').not().isEmpty(),
                check('email','El Email es obligatorio').isEmail(),
                check('password','El Password es obligatorio, de 6 Carateres').isLength({min:6}),
                validarCampos
            ], 
            crearUsuario);

//Login de User, Segundo arg, son middlewares de validaciones
router.post('/', 
            [ 
                check('email','El Email es obligatorio').isEmail(),
                check('password','El Password es obligatorio, de 6 Caracteres').isLength({min:6}),
                validarCampos
            ], 
            loginUsuario);

//Validar y Revalidar token
router.get('/renew', validarJWT, revalidarToken);


module.exports = router;