;
const storage = require("./storage");

storage.put('first','firstValue');
storage.put('second','secondValue');
storage.put('third','thirdValue');
storage.put('fouth','fourthValue');
storage.save();
storage.clear();
console.log(storage.getAll());

storage.load().then( () => {
    console.log(storage.getAll());
});