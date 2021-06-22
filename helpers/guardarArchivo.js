const fs = require('fs');
const { arch } = require('os');

const archivo = './database/data.json';

const guardarDB = (data) =>{
    
    fs.writeFileSync(archivo, JSON.stringify(data));
}


const leerDB = ()=>{
    if(!fs.existsSync(archivo)){//Estoy preguntando si el archivo NO existe
        return null;//No existe, no hay nada q cargar, regresa null
    }

const info = fs.readFileSync(archivo, {encoding: 'utf-8'})//Pero si existe, se lee todo lo q se encuentra en el fs
const data = JSON.parse(info);//Parse convierte 
//console.log(data);

return data;
};




module.exports = {
    guardarDB,
    leerDB
}