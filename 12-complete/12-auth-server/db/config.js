const mongoose  = require("mongoose");
require('dotenv').config();



const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true 
        });

        console.log('BD online...');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar BD.');
    }

}


module.exports = { dbConnection }