//ejemplo de hacer la interfaz de forma manual sin inquirer
require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log(
      `======================
 Seleccione una opcion:
======================\n`.green
    );

    console.log(`${`1.`.bgWhite.black} Crear Tarea`);
    console.log(`${`2.`.bgWhite.black} Listar tareas`);
    console.log(`${`3.`.bgWhite.black} Listar tareas completadas`);
    console.log(`${`4.`.bgWhite.black} Listar tareas pendientes`);
    console.log(`${`5.`.bgWhite.black} Completar tareas`);
    console.log(`${`6.`.bgWhite.black} Borrar tarea`);
    console.log(`${`0.`.bgWhite.black} Salir \n`);

    //recibir informacion del usuario
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("Seleccione una opcion: ".red, (opt) => {
      readLine.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\nPreseione ${"ENTER".blue} para continuar\n`, () => {
      readLine.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
