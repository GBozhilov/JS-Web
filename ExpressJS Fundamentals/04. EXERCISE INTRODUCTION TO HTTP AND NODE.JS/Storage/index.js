const storage = require('./storage');

storage.load();

console.log(storage.getAll());