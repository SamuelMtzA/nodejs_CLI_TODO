//importar filesystem para generar el archivo para alamacenar la bases de datos
const fs = require("fs");
//referencia de locacion
const archivo = "./databases/data.json";

const guardarDB = (data) => {
  //   JSON.stringify debe ser un string
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
  //verificar si existe el json
  if (!fs.existsSync) {
    return null;
  }
  //leer el archivo json sin mostrar los bytes
  const info = fs.readFileSync(archivo, { encoding: "utf-8" });
  //recuperar la informacion de nuestro json ya creado y cambiarla a un arreglo
  const data = JSON.parse(info);
  // console.log(data);
  //areglo de tareas
  return data;
};

module.exports = {
  guardarDB,
  leerDB,
};
