require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
       } = require("./helpers/inquirer");
const Tarea = require("./helpers/models/tarea");
const Tareas = require("./helpers/models/tareas");


const main = async () => {
  

  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if(tareasDB){//cargar tareas si existen
    tareas.cargarTareasFromArray(tareasDB);
    
  }
 

  do {
    //Imprimir el menu
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
          //Crear Tareas 
          const desc = await leerInput('Descripción:');
          tareas.crearTarea(desc);
        break;
      case '2': //Listar tareas
          tareas.listadoCompleto();
        break;
        case '3': //listar completadas
          tareas.listarPendientesCompletadas(true);
        break;
        case '4': //listar pendientes
          tareas.listarPendientesCompletadas(false);
        break;
        case '5': //Tareas completas
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
        case '6': //Borrar tareas
          const id = await listadoTareasBorrar(tareas.listadoArr);
          if(id !== '0'){
            const ok = await confirmar('¿Estás seguro?')
            if(ok){
              tareas.borrarTarea(id);
              console.log('Tarea borrada');
            }
          }
        break;
    
    }
    
    guardarDB(tareas.listadoArr);

    await pausa();
    
  } while (opt !== "0");
};

main();
