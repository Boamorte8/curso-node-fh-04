const description = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer',
};

const status = {
    alias: 's',
    default: false,
    desc: 'Status de la tarea. Si esta completada o no. (true o false)',
};

const statusFilter = {
    alias: 's',
    desc: 'Status de la tarea a filtrar. Si esta completada o no. (true o false)',
};

const options = [
    {
        description,
        status
    },
    {
        description,
    },
    {
        status: statusFilter,
    },
];

const commands = {
    crear: {
        name: 'crear',
        description: 'Crea una nueva tarea en el To Do List',
        options: options[0]
    },
    listar: {
        name: 'listar',
        description: 'Lista todas las tareas en el To Do List',
        options: options[2]
    },
    actualizar: {
        name: 'actualizar',
        description: 'Actualiza una de las tareas en el To Do List',
        options: options[0]
    },
    borrar: {
        name: 'borrar',
        description: 'Borra la tarea especificada de las tareas en el To Do List',
        options: options[1]
    },
};

const argv = require('yargs')
    .command(commands.crear.name, commands.crear.description, commands.crear.options)
    .command(commands.listar.name, commands.listar.description, commands.listar.options)
    .command(commands.actualizar.name, commands.actualizar.description, commands.actualizar.options)
    .command(commands.borrar.name, commands.borrar.description, commands.borrar.options)
    .help()
    .argv;

module.exports = {
    argv
}