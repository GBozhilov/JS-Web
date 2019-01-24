;
const fileManager = require("fs");
let storage = {};

const put = function(key, value) {
    checkIsString(key);
    checkIsExistInStorage(key, `The key:${key} already exist in storage.`, true);

    storage[key] = value;
}

const get = function(key) {
    checkIsString(key);
    checkIsExistInStorage(key, `The key:${key} is not exist in storage.`, false);

    return storage[key];
}

const getAll = function() {
    if (Object.keys(storage).length === 0) {
        return "There are no items in the storage";
    }

    return storage;
}

const update = function(key, newValue) {
    checkIsString(key);
    checkIsExistInStorage(key, `The key:${key} is not exist in storage.`, false);

    storage[key] = newValue;
}

const delte = function(key) {
    checkIsString(key);
    checkIsExistInStorage(key, `The key:${key} is not exist in storage.`, false);

    delete storage[key];
}

const clear = function() {
    storage = {};
}

const save = function() {
    return new Promise((resolve, reject) => {
        let savedData = JSON.stringify(storage);

        fileManager.writeFile("./02.AsynchronousStorage/storage.json", savedData, err => {
            if(err) {
                console.log(err.message);
                return;
            }

            resolve();
        });
    });
}

const load = function() {
    return new Promise((resolve, reject) => {
        fileManager.readFile("./02.AsynchronousStorage/storage.json", (err, data) => {
            if (data.length === 0) {
                err();
            }

            storage = JSON.parse(data);
            resolve();
        });
    }); 
}

function checkIsExistInStorage(key, errorMessage, expectResult) {
    if (storage.hasOwnProperty(key) === expectResult) {
        throw new Error(errorMessage);
    }

    return !expectResult;
}

function checkIsString(variable) {
    if (typeof(variable) !== "string") {
        throw new Error(`The key(${variable}) is not a string.`);
    }

    return true;
}

module.exports = { put, get, getAll, update, delte, clear, save, load };