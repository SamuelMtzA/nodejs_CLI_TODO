//Se crea la base de datos con la clase Tarea
//_listad:{uuid-34234234-342342-2:{id:,desc:asdas,completadoFecha:9384584943}}
const Tarea = require("./tarea");

class Tareas {
  _listado = {};
  //getter para retornar un nuevo arreglo
  get listadoArr() {
    //arreglo final
    const listado = [];
    //extraer las llaves de _listado e insertar dentro del arreglo vacio
    Object.keys(this._listado).map((key) => {
      //extraer tarea de _listado
      const tarea = this._listado[key];
      //agregar en el nuevo arreglo de listado
      listado.push(tarea);
    });
    return listado;
  }
  constructor() {
    //donde se va almacenar nuestros datos
    this._listado = {};
  }

  Borrartarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasfromArray(tareas = []) {
    tareas.map((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    //this._listado.tarea.id es lo mismo
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    //argumento index, sumamos uno para empezar 1 y desestructuramos tarea
    this.listadoArr.map((tarea, i) => {
      const index = `${i + 1}`.cyan;
      const { desc, compleadoFecha } = tarea;
      //verificar si el estado es nulo
      const estado = compleadoFecha ? "Completado".green : "pendiente".red;

      console.log(`${index}. ${desc} - ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let index = 0;

    this.listadoArr.map((tarea) => {
      const { desc, compleadoFecha } = tarea;
      //verificar si el estado es nulo
      const estado = compleadoFecha ? "Completado".green : "pendiente".red;

      if (completadas) {
        if (compleadoFecha) {
          index++;
          console.log(
            `${(index + ".").green} ${desc} - ${compleadoFecha.green}`
          );
        }
      } else {
        if (!compleadoFecha) {
          index++;
          console.log(`${(index + ".").red} ${desc} - ${estado}`);
        }
      }
    });
  }
  toggleCompletadas(ids = []) {
    // extraer taream
    ids.forEach((id) => {
      const tarea = this._listado[id];
      // compleadoFecha = null, marcar comletada
      if (!tarea.compleadoFecha) {
        tarea.compleadoFecha = new Date().toISOString().green;
      }
    });
    //solucion de problema para quitar tarea como completada
    this.listadoArr.forEach((tarea) => {
      //si no existe la tarea en el listado
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].compleadoFecha = null;
      }
    });
  }
}

module.exports = Tareas;
