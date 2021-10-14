//menu principal, donde se renderiza el programa
require("colors");
("use strict");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChck,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  //crear instancia a partir de Tareas
  const tareas = new Tareas();

  //leer contenido de la base de datos
  const tareasDb = leerDB();

  //si exste una base de datos json, cargale lo que se tiene en el json
  if (tareasDb) {
    tareas.cargarTareasfromArray(tareasDb);
  }

  do {
    //imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoChck(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const confirmacion = await confirmar("Estas seguro?");
          if (confirmacion) {
            tareas.Borrartarea(id);
            console.log("tarea borrada");
          }
        }
        break;

      default:
        break;
    }

    guardarDB(tareas.listadoArr);

    await inquirerPausa();
  } while (opt !== "0");
};

main();
