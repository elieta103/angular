const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = ( uid, name, email) => {
    
    const payload = {uid, name, email};

    //Se crea una nnueva promesa para devolver el JWT
    return new Promise ((resolve, reject)=>{
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(token);
            }
    
        });
    
    });

}

module.exports = { generarJWT }