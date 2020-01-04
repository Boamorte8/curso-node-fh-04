const fs = require('fs');
const colors = require('colors/safe');

const nameFile = 'data.json';
const filePath = `db/${nameFile}`;

let listToDo = [];

/**
 * Function to read the DB file
 *
 * @returns
 */
const getDB = () => {
    try {
        listToDo = require(`../${filePath}`);
    } catch (error) {
        listToDo = [];
    }
}

/**
 * Function to save on the DB file
 *
 * @returns
 */
const saveDB = () => {
    let data = JSON.stringify(listToDo);
    fs.writeFile(filePath, data, (err) => {
        if (err) throw new Error('File cannot be saved', err);
    });
};

const crear = (description, status = false) => {
    getDB();

    let toDo = {
        description,
        status,
    };

    listToDo.push(toDo);
    saveDB();
    return toDo;
};

const toList = (status) => {
    getDB();
    console.log(colors.blue('================To Do List================'));
    console.log('================================');
    const newList = [];
    if (status === null) {
        newList = listToDo;
    } else {
        newList = listToDo.filter(task => task.status == status)
    }
    newList.forEach((task) => {
        const descriptionText = `Description: ${task.description}`;
        const statusText = `Status: ${task.status}`;
        if (task.status) {
            console.log(colors.green(descriptionText));
            console.log(colors.green(statusText));
        } else {
            console.log(colors.red(descriptionText));
            console.log(colors.red(statusText));
        }
        console.log('================================');
    });
}

/**
 * Function to update a task
 *
 * @param {*} description
 * @param {*} status
 */
const updateTask = (description, status = true) => {
    const onSuccess = (index) => {
        listToDo[index].status = status === 'false' ? false : true;
        console.log('Updated task: ', description);
    }
    return findTask(description, onSuccess);
}

/**
 * Function to delete a task
 *
 * @param {*} description
 */
const deleteTask = (description) => {
    const onSuccess = (index) => {
        listToDo.splice(index, 1);
        console.log('Deleted task: ', description);
    }
    return findTask(description, onSuccess);
}

/**
 * Function to find a task in the To Do List
 *
 * @param {*} description
 * @param {*} action
 * @returns
 */
const findTask = (description, action) => {
    getDB();
    let index = listToDo.findIndex(task => task.description === description);
    if (index >= 0) {
        action(index);
        saveDB();
        return true;
    } else {
        console.log('Task not exist');
        return false;
    }
}

module.exports = {
    crear,
    toList,
    updateTask,
    deleteTask,
}
