const argv = require('./config/yargs').argv;
const colors = require('colors/safe');
const { crear, toList, updateTask, deleteTask } = require('./todo/todo');

let comando = argv._[0];

switch (comando) {
    case 'listar':
        toList(argv.status ? argv.status : null);
        break;
    case 'crear':
        const task = crear(argv.description, argv.status ? argv.status : false);
        console.log(colors.blue('New task:'));
        console.log(task);
        if (task.status) {
            console.log(colors.green(task.description));
        } else {
            console.log(colors.red(task.description));
        }
        break;
    case 'actualizar':
        let updated = updateTask(argv.description, argv.status ? argv.status : true);
        break;
    case 'borrar':
        let deleted = deleteTask(argv.description);
        break;
    default:
        console.log('Command not exits');
}