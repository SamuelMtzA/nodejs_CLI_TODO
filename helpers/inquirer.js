//se crea la interfaz de usuario del menu y la pausa
const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".yellow} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".yellow} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".yellow} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".yellow} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".yellow} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".yellow} Borrar tarea`,
      },

      {
        value: "0",
        name: `${"0.".yellow} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log(
    `${"======================".green}
${"Seleccione una opcion".yellow}
${"======================".red}\n`
  );

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const inquirerPausa = async () => {
  const question = [
    {
      type: "input",
      name: "pausa",
      message: `Preseione ${"ENTER".blue} para continuar`,
    },
  ];

  console.log("\n");

  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  //crear menu para elegir cual borrar
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });
  //agregar la opcion de salir al principio de choices
  choices.unshift({
    value: "0",
    name: "0.".blue + " cancelar",
  });

  //al dar click a la seleccion despliega la opcion para borrar
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

//funcion de confirmacion de borrar el elemento
const confirmar = async (messsage) => {
  const question = {
    type: "confirm",
    name: "ok",
    messsage,
  };
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChck = async (tareas = []) => {
  //crear menu para elegir cual borrar
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.compleadoFecha ? true : false,
    };
  });

  //al dar click a la seleccion despliega la opcion para borrar
  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  inquirerPausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChck,
};
