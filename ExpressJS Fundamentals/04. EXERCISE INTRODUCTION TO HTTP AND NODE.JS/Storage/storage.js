const fs = require('fs');
let storage = {};

function isString(val) {
    return typeof val === 'string' || val instanceof String;
}

function hasProperty(val) {
    return storage.hasOwnProperty(val);
}

function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = {
    put: (key, value) => {
        if (!isString(key)) {
            throw new Error('The key must be a string!');
        }

        if (hasProperty(key)) {
            throw new Error('The key already exist!');
        }

        storage[key] = value;
    },
    get: (key) => {
        if (!isString(key)) {
            throw new Error('The key must be a string!');
        }

        if (!hasProperty(key)) {
            throw new Error('The key does not exist!');
        }

        return storage[key];
    },
    getAll: () => {
        if (isEmptyObj(storage)) {
            throw new Error('Storage is empty!');
        }

        return storage;
    },
    update: (key, newVal) => {
        if (!isString(key)) {
            throw new Error('The key must be a string!');
        }

        if (!hasProperty(key)) {
            throw new Error('The key does not exist!');
        }

        storage[key] = newVal;
    },
    delete: (key) => {
        if (!isString(key)) {
            throw new Error('The key must be a string!');
        }

        if (!hasProperty(key)) {
            throw new Error('The key does not exist!');
        }

        delete storage[key];
    },
    clear: () => {
        for (let prop in storage) {
            delete storage[prop];
        }
        //storage = {};
    },
    save: () => {
        let objStr = JSON.stringify(storage);
        fs.writeFileSync('storage.json', objStr, 'utf8')
    },
    load: () => {
        if (!fs.existsSync('storage.json')) {
            throw new Error('File does not exist!');
        }

        let data = fs.readFileSync('storage.json');
        storage = JSON.parse(data);
    }
};